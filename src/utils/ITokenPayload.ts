import { JwtPayload } from "jsonwebtoken";

export interface ITokenPayload extends JwtPayload{
    email: string,
    password: string 
  }

