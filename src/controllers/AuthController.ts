import { NextFunction, Request,Response } from "express";
import { User } from "../Models/User";
import { UserDal } from "../DAL/UserDal";
import bcrypt from "bcrypt";
import {generateJWTToken,verifyToken} from "../utils/jwt.utils";
import {ITokenPayload} from "../utils/ITokenPayload";



export class AuthController {

    static async signup(req:Request,res:Response){
        console.log(`Request body content ${req.body}`);
        const saltRounds = 12;

        const existingUser = await UserDal.getUser({"email":req.body.email})
        console.log(existingUser);
        if(existingUser){
            res.status(409).send("{'Msg':'User already exists'}");
        }
        else{
            const salt = await bcrypt.genSaltSync(saltRounds);
            const token = generateJWTToken({"email": req.body.email,"password": req.body.password,});
            const newUser = new User();
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            newUser.email = req.body.email;
            newUser.password = await bcrypt.hash(req.body.password,salt);
            newUser.token = token;

            console.log(`New user from request ${newUser}`);       

            const userRes = await UserDal.SaveUser(newUser);

            if(userRes){
                res.status(201).send(JSON.stringify({'_id':userRes._id,'email':userRes.email,'first_Name':userRes.first_Name,"last_Name":userRes.last_name,"create_date":userRes.create_date}));
            }
            else{
                res.status(500).send("{'Msg':'Internal server error while processing the request'}");
            }
        }
    }

    static async signin(req:Request,res:Response){
        // res.status(200).send("{'Msg':'from signin'}");
        try{
            let jwt = req.headers.authorization;
            const reqEmail = req.body.email;
            const reqPassword = req.body.password;
            console.log("JWT Token from url " + jwt + "\n Email from Request " + reqEmail + "\n Password from Request " + reqPassword);
            if(!jwt){
                return res.status(401).json({message:"Invalid Token."});
            }

            if(jwt.toLowerCase().startsWith("bearer")){
                jwt = jwt.slice("bearer".length).trim();
            }

            const decodedToken : any = verifyToken(jwt);
            console.log(decodedToken);

            if(decodedToken){
                // query db for password and email and verify
                const user = await UserDal.getUser({email:reqEmail});
                if(user){
                    const comparePassword = await bcrypt.compare(reqPassword,user.password);
                    if(comparePassword){
                        //match password
                        return res.status(200).json({message:"Authenticated"});
                    }
                    else{
                        // Bad Password
                        return res.status(401).json({message: "Bad Password"});
                    }
                }
                else{
                    // user not prsent
                    return res.status(404).json({message: "User not found"});
                }
            }
        }
        catch(error:any){
            console.log("Error during processing jwt");
            console.log(error);
            if(error.name === "TokenExpiredError"){
                return res.status(401).json({message: "Expired Token"});
            }
            if(error.name === "JsonWebTokenError"){
                return res.status(401).json({message: "Invalid token"});
            }
        }
        // res.status(500).json({message: "Failed to authenticate the user."});
    }

}
