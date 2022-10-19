import type { NextApiRequest, NextApiResponse } from 'next'

const bcrypt = require('bcrypt');
const UserData = require("../../../server/models/UserModel")

import {UserRegister} from '../../../interfaces/UserLoginInterface'
import mongoose from 'mongoose';
import {CheckIfEmailExists} from '../../../server/helpers/findUserByEmail'
import {LoggingInterface, ReposneInterface} from '../../../interfaces/reponseTypeRegister'
import {sign} from '../../../server/helpers/validateToken'
import { Token } from '../../../interfaces/UserLoginInterface';

//add uuid for custom identifier for each user

export default async function Handler(req: NextApiRequest, res: NextApiResponse<ReposneInterface | LoggingInterface>) {

    await mongoose.connect(process.env.DATABASE_URL)
    const parseObj: UserRegister = JSON.parse(req.body)
    const saltRounds: number = 10;
    bcrypt.genSalt(saltRounds, async function(err: any, salt: any) {
        if(err){
            console.log(err)
        }
        bcrypt.hash(parseObj.password, salt, async function(err:any, hash: string) {
            if(err){
                console.log(err)
            }
            if(await CheckIfEmailExists(parseObj.email) == true){

                const claims: Token = {
                    Name: parseObj.name,
                    Email: parseObj.email
                }
                const jwt = await sign(
                    claims, 
                    process.env.ACCESS_TOKEN_SECRET, 
                    )
                const data = await UserData.create({
                    Name: parseObj.name,
                    Email: parseObj.email,
                    Password: hash
                })
                await data.save()

                res.status(200).json({message: {text: "udało się zalogować", status: 1 }, token: jwt })
            } else{

                res.status(200).json({message: {text: "uzytkownik o podanym mailu istnieje", status: 0 }})
            }
            
        });
    });

}