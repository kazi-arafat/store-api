import { SignOptions, sign , VerifyOptions,verify, Secret, VerifyErrors } from "jsonwebtoken";
import * as fs from 'fs';
import * as path from 'path';
import { ITokenPayload } from "./ITokenPayload";

export function generateJWTToken(payload:any){
    const pwd = process.env.PASSPHRASE!;
    const keyPath = path.join(__dirname,"../../../private.key");
    const privateKey = fs.readFileSync(keyPath);

    const privateOrSecret : Secret = {
        key: privateKey, 
        passphrase: pwd
    }

    const signInOptions : SignOptions = {
        algorithm: 'RS256',
        expiresIn: '1h'
        
    }
    return sign(payload, privateOrSecret, signInOptions);
}


export function verifyToken(token:string){
    const publicKey = fs.readFileSync(path.join(__dirname,"../../../public.key"));
    console.log(publicKey);

    const verifyOptions: VerifyOptions = {
        algorithms : ['RS256'],
        
    };

    const publicKeySecret: Secret = {
        key: publicKey, 
        passphrase: process.env.PASSPHRASE!
    };

    return verify(token,publicKey,verifyOptions);
            
}