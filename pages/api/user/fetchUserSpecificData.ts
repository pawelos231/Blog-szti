import type { NextApiRequest, NextApiResponse } from 'next'
import {verify} from '../../../server/helpers/validateToken'
const BlogPosts = require("../../../server/models/BlogPosts")
import { VerifiedToken } from '../../../interfaces/Token'
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const token = String(req.headers["authorization"])
    console.log(token)
    const decodedData: VerifiedToken = await verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log(decodedData)
    const data: any = await BlogPosts.find({UserEmail: decodedData.Email})
    console.log(data)
    res.status(200).json({posts:{data}})

}