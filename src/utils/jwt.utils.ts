import { SignOptions, sign , VerifyOptions,verify } from "jsonwebtoken";
import * as fs from 'fs';
import * as path from 'path';

export function generateJWTToken(payload:any){
    const pwd = process.env.PASSPHRASE;
    const keyPath = path.join(__dirname,"../../../private.key");
    const privateKey = fs.readFileSync(keyPath);

    const privateOrSecret = {
        key:privateKey, 
        passphrase: pwd
    }

    const signInOptions : SignOptions = {
        algorithm: 'RS256',
        expiresIn: '1h'
        
    }
    return sign(payload, privateOrSecret, signInOptions);
}


export function verifyToken(token:string):Promise<ITokenPayload>{
    const publicKey = fs.readFileSync(path.join(__dirname,"../../../public.key"),"utf8");
    console.log(publicKey);
    const verifyOptions: VerifyOptions = {
        algorithms : ['RS256']
    };
    return new Promise((resolve,reject) => {
        verify(token,{key: publicKey, passphrase: process.env.PASSPHRASE}, verifyOptions,(error:any, decoded:ITokenPayload) =>{
            if(error){
                return reject(error)
    
            } else{
                return resolve(decoded)
    
            } 
        })
    });
}