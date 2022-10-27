import { User } from "../Models/User";

export class UserDal {

    static users:User[] = [];

    static SaveUser(user:User):any{
        const newUser = this.users.filter(u => {return u === user});
        if(!newUser){
            console.log("Adding User");
            this.users = this.users.map(newUser);
            
        }
        return newUser;

    }
}