import {  NextApiRequest, NextApiResponse } from "next";
import { CommentsOnPost } from "../../../../interfaces/PostsInterface";
import mongoose from "mongoose";
const CommentOnPost = require("../../../../server/models/CommentModel")

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    await mongoose.connect(process.env.DATABASE_URL)
    const postId: string = JSON.parse(req.body)
    const data = await CommentOnPost.find({PostId: postId})
  
      
    res.status(200).json(data)
}