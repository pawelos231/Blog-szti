import type { NextApiRequest, NextApiResponse } from 'next'

//models and hashing
import mongoose from 'mongoose';
const bcrypt: any = require('bcrypt');
const UserData: any = require("@server/models/UserModel")

//interfaces
import { Register } from '@interfaces/UserLoginInterface'
import { Token } from '@interfaces/UserLoginInterface';
import { LoggingInterface, ReposneInterface } from '@interfaces/reponseTypeRegister'

//Helpers
import { CheckIfEmailExists } from '@server/helpers/findUserByEmail'
import { sign } from '@server/helpers/validateToken'



//add uuid for custom identifier for each user
export default async function Handler(req: NextApiRequest, res: NextApiResponse<ReposneInterface | LoggingInterface>) {

    await mongoose.connect(process.env.DATABASE_URL)
    const {email, password, name}: Register = JSON.parse(req.body)
    const saltRounds: number = 10;
    bcrypt.genSalt(saltRounds, async function (err: any, salt: any) {
        if (err) {
            console.log(err)
        }
        bcrypt.hash(password, salt, async function (err: any, hash: string) {
            if (err) {
                console.log(err)
            }
            if (await CheckIfEmailExists(email) === false) {

                const claims: Token = {
                    Name: name,
                    Email: email
                }

                const jwt: string = await sign(
                    claims,
                    process.env.ACCESS_TOKEN_SECRET,
                )

                const data: any = await UserData.create({
                    Name: name,
                    Email: email,
                    Password: hash
                })

                await data.save()
                res.status(200).json({ message: { text: "udało się zalogować", status: 1 }, token: jwt, name: name })

            } else {
                res.status(200).json({ message: { text: "uzytkownik o podanym mailu istnieje", status: 0 } })
            }

        });
    });

}