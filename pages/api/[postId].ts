import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
const BlogPosts = require("../../server/models/BlogPosts")
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
   

    await mongoose.connect(process.env.DATABASE_URL)

    const {postId} : Partial<{ [key: string]: string | string[]; }> = req.query

    const data = await BlogPosts.findById(postId)

    res.status(200).json(data)
}