import { NextApiResponse, NextApiRequest } from "next";
import mongoose from "mongoose";
import { VerifiedToken } from '../../../interfaces/Token'
import { verify } from '../../../server/helpers/validateToken'
const BlogPosts = require("../../../server/models/BlogPosts")
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    await mongoose.connect(process.env.DATABASE_URL)
    const token: string = String(req.headers["authorization"])
    console.log(token)
    const decodedData: VerifiedToken = await verify(token, process.env.ACCESS_TOKEN_SECRET)

    const posts: any = await BlogPosts.find({ WhoLiked: String(decodedData.Name) })
    console.log(posts)

    res.status(200).json(posts)
}