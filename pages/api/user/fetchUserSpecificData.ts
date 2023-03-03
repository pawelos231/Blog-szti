import type { NextApiRequest, NextApiResponse } from 'next'
import { verify } from '@server/helpers/validateToken'
import { VerifiedToken } from '@interfaces/Token'
import {getPostsByUser} from '@server/db/posts'

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {


    const token: string = String(req.headers["authorization"])

    const {Email}: VerifiedToken = await verify(token, process.env.ACCESS_TOKEN_SECRET)
    const {result, error} = await getPostsByUser(String(Email))
    if(error) {
        console.log(error)
    }

    res.status(200).json(result)
}