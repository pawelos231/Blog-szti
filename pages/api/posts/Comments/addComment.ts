import { NextApiRequest, NextApiResponse } from "next";
import { IPostComment } from "@interfaces/PostsInterface";
import mongoose from 'mongoose'
import { deleteAllRedisValues } from "@server/cache/cache";
import { authMiddleware, AuthenticatedRequest } from "@pages/api/middleware/authMiddleware";
const CommentOnPost = require("@server/models/CommentModel")


export default authMiddleware(async function Handler(req, res) {
    await mongoose.connect(process.env.DATABASE_URL)
    deleteAllRedisValues()


    const CommentObjectForFront: IPostComment = {
        ...JSON.parse(req.body),
        UserId: req.user.Email as string,
        UserName: req.user.Name as string
    }

    const createdComment: any = await CommentOnPost.create(CommentObjectForFront)

    await createdComment.save()
    res.status(200).json({ Comment: CommentObjectForFront, status: 1, text: "udało się dodać komentarz" })
})