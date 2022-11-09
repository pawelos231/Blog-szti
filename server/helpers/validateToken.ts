import {SignJWT, jwtVerify, type JWTPayload} from 'jose';
import { Token } from '../../interfaces/UserLoginInterface';

//sign functions using jose beacuse default jsonwebToken does not work on the edge enviroment

export async function sign(payload: Token, secret: string): Promise<string> {
    const iat: number = Math.floor(Date.now() / 1000);
    const exp: number = iat + 6000 * 6000; 

    return new SignJWT({...payload})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret));
}

export async function verify(token: string, secret: string): Promise<any> {
    const {payload}: {payload: JWTPayload} = await jwtVerify(token, new TextEncoder().encode(secret));
    
    return payload;
}
