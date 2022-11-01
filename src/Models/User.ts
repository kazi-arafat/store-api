import { IUser } from "./IUser";

export class User implements IUser{
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    token! : string;

    user(firstName:string,lastName:string,email:string,password:string,token:string){
        this.firstName = firstName;
        this.lastName   = lastName;
        this.email = email;
        this.password = password;
        this.token = token;

    }
}