import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import {verify} from '../../../server/helpers/validateToken'
const BlogPosts = require("../../../server/models/BlogPosts")
import { VerifiedToken } from '../../../interfaces/Token'
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    await mongoose.connect(process.env.DATABASE_URL)
    const token = String(req.headers["authorization"])
    const decodedData: VerifiedToken = await verify(token, process.env.ACCESS_TOKEN_SECRET)
    const data: any = await BlogPosts.find({UserEmail: String(decodedData.Email)})
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
      )
    
     res.status(200).json({posts:{data}}) 
}