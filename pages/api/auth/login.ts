import type { NextApiRequest, NextApiResponse } from 'next'
import {CheckIfEmailExists} from '../../../server/helpers/findUserByEmail'
import {UserLogin} from '../../../interfaces/UserLoginInterface'
import {sign} from "jsonwebtoken"
import {LoggingInterface, ReposneInterface} from '../../../interfaces/reponseTypeRegister'

const bcrypt = require('bcrypt');

export default async function Handler(req: NextApiRequest, res: NextApiResponse<LoggingInterface | ReposneInterface>) {
    const parseObj: UserLogin = JSON.parse(req.body)
    if(await CheckIfEmailExists(parseObj.email) !== true){

        const UserData = await CheckIfEmailExists(parseObj.email)

        bcrypt.compare(parseObj.password ,UserData.Password, function(err: any, result: boolean){
            if(err){
                console.log(err)
            }
            
            if(result){
             const claims: Object = {
                    Name: UserData.Name,
                    Email: UserData.Email
                }
                const jwt = sign(claims, process.env.ACCESS_TOKEN_SECRET)
                res.status(200).json({message: {text: "udało się zalogować", status: 1}, token: jwt})
            } else{
                res.status(200).json({message: {text: "niepoprawne email bądź hasło", status: 0}})

            }
        })

    } else{
        res.status(200).json({message: {text: "niepoprawne hasło bądź email" , status: 0}})
    }
}