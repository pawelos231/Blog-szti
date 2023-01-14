import { NextApiRequest, NextApiResponse } from "next";
import { CommentsOnPost } from "../../../../interfaces/PostsInterface";
import mongoose from 'mongoose'
import {verify} from '../../../../server/helpers/validateToken'
const CommentOnPost = require("../../../../server/models/CommentModel")


export default async function Handler(req: NextApiRequest, res: NextApiResponse){
    await mongoose.connect(process.env.DATABASE_URL)
    
    const token: string = String(req.headers["authorization"])
    let decodedData: any = await verify(token, process.env.ACCESS_TOKEN_SECRET)
    const UserId: string = decodedData.Email
    const UserName: string = decodedData.Name
    if(token == "null"){
        console.log("niezalogowany")
        res.status(401).send({text: "NOT authenticated"}) 
        return
    }

    const Comment: CommentsOnPost = JSON.parse(req.body)
    const CommentObjectForFront: CommentsOnPost = {...Comment, UserId, UserName}
    const createdComment: any = await CommentOnPost.create({
        UserId: UserId,
        PostId: Comment.PostId,
        CreatedAt: Comment.CreatedAt,
        Content: Comment.Content,
        WhoLiked: Comment.WhoLiked,
        ParentId: Comment.ParentId,
        NestedLevel: Comment.NestedLevel,
        UpdatedAt: Comment.UpdatedAt,
        UserName: UserName,
    })

    await createdComment.save()
    res.status(200).json({Comment: CommentObjectForFront,  status: 1, text: "udało się dodać komentarz"})
}