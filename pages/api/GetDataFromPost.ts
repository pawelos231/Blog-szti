import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
const BlogPosts = require("./models/BlogPosts")
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    await mongoose.connect(process.env.DATABASE_URL)
   const data = await BlogPosts.find({})
    res.status(200).json(data)
}