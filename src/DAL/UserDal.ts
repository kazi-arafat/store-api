import { User } from "../Models/User";
import {DbContext} from "./DbContext";

export class UserDal {

    static async SaveUser(user:User):Promise<any>{
        
        DbContext.prisma.$connect();
        const newUser = await DbContext.prisma.user.create({
            data: {
                "first_name":  user.firstName,
                "last_name": user.lastName,
                "email": user.email,
                "password": user.password,
                "token": user.token                
            }
        });
        DbContext.prisma.$disconnect();
        return newUser; 
    }

    static async getUser(data:any){
        DbContext.prisma.$connect();
        const user = await DbContext.prisma.user.findUnique({where:{'email': data.email}});
        DbContext.prisma.$disconnect();
        return user;

    }
}