import { Request,Response } from "express";
import { User } from "../Models/User";
import { UserDal } from "../DAL/UserDal";
import bcrypt from "bcrypt";
import {generateJWTToken} from "../utils/jwt.utils";



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

}
