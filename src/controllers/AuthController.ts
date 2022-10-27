import { Request,Response } from "express";
import { User } from "../Models/User";
import { UserDal } from "../DAL/UserDal";

export class AuthController {

    static signup(req:Request,res:Response){
        console.log(req.body);

        const newUser = new User();
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.email = req.body.email;
        newUser.password = req.body.password;

        console.log(newUser);

        const userRes = UserDal.SaveUser(newUser);
        console.log(`User response ${userRes}`);

        if(userRes){
            res.status(201).send(JSON.stringify(req.body));
        }
        else{
            res.status(409).send("{'Msg':'User already exists'}");
        }
        

    }

}
