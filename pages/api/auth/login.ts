
//libraries
import type { NextApiRequest, NextApiResponse } from 'next'
import {sign} from "jsonwebtoken"
import mongoose from 'mongoose';


//helpers
import {CheckIfEmailExists} from '../../../server/helpers/findUserByEmail'

//interfaces
import {LoggingInterface, ReposneInterface} from '../../../interfaces/reponseTypeRegister'
import { Token, ReceivedLoginData } from '../../../interfaces/UserLoginInterface'
import {UserLogin} from '../../../interfaces/UserLoginInterface'


const bcrypt = require('bcrypt');

export default async function Handler(req: NextApiRequest, res: NextApiResponse<LoggingInterface | ReposneInterface | any>) {

    await mongoose.connect(process.env.DATABASE_URL)
    const parseObj: UserLogin = JSON.parse(req.body)
    if(await CheckIfEmailExists(parseObj.email) != true){
        const UserData: ReceivedLoginData = await CheckIfEmailExists(parseObj.email)

        const PasswordInDatabase: string = UserData.Password
        const PasswordGivenByUser: string = parseObj.password

        bcrypt.compare(PasswordGivenByUser ,PasswordInDatabase, async function(err: any, result: boolean){

            if(err)
            {
                console.log(err)
                res.status(500).json(err)
            } 

            if(result)
            {
               const claims: Token = {
                    Name: UserData.Name,
                    Email: UserData.Email
                    }
                
                console.log(UserData.Name)

                const jwt = await sign(claims, process.env.ACCESS_TOKEN_SECRET)

                res.status(200).json({message: {text: "udało się zalogować", status: 1}, token: jwt, name:UserData.Name})
            } 
            else
            {
                res.status(200).json({message: {text: "niepoprawne email bądź hasło", status: 0}})
            }
        })
    } 
    else
    {
        res.status(200).json({message: {text: "niepoprawne hasło bądź email" , status: 0}})
    }
}