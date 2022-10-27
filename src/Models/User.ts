import { IUser } from "./IUser";

export class User implements IUser{
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;

    user(firstName:string,lastName:string,email:string,password:string){
        this.firstName = firstName;
        this.lastName   = lastName;
        this.email = email;
        this.password = password;

    }
}