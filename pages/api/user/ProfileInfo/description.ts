import { NextApiResponse, NextApiRequest } from "next";
import {setProfileDescritpion, getUserDataByEmail} from '@server/db/user'
import { verify } from "@server/helpers/validateToken";
import {GET, POST} from '@constants/reqMeth'
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {

    const token: string = String(req.headers["authorization"])
    const {Name, Email}: any = await verify(token, process.env.ACCESS_TOKEN_SECRET)
    const METHOD: string = req.method
    switch(METHOD) {
        case GET: {
            const {result, error} = await getUserDataByEmail(Email)
            if(error){
                console.log(error)
                return
            }
            res.status(200).json(result)
            break;
        }

        case POST:{
            const description: string = req.body
            const {result, error} = await setProfileDescritpion(Email, description)
            if(error){
                console.log(error)
                return
            }
            if(result) res.status(200).json(description) 
            break;
        }
        default:
            res.status(200).json({ message: 'nie znaleziono metody'}) 
    }
}