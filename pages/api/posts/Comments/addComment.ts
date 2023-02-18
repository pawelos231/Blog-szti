import { NextApiRequest, NextApiResponse } from "next";
import { CommentsOnPost } from "../../../../interfaces/PostsInterface";
import mongoose from 'mongoose'
import { verify } from '../../../../server/helpers/validateToken'
import { JWTPayload } from "jose";
const CommentOnPost = require("../../../../server/models/CommentModel")


export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    await mongoose.connect(process.env.DATABASE_URL)

    const token: string = String(req.headers["authorization"])
    const { Email, Name }: any = await verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (token == "null") {
        console.log("niezalogowany")
        res.status(401).send({ text: "NOT authenticated" })
        return
    }

    const CommentObjectForFront: CommentsOnPost = {
        ...JSON.parse(req.body),
        UserId: Email as string,
        UserName: Name as string
    }
    if (CommentObjectForFront.UserId === "" || CommentObjectForFront.UserName === "") {
        res.send("nie mozesz przesyłać wartości będąc nie zalogowanym")
    }
    const createdComment: any = await CommentOnPost.create(CommentObjectForFront)

    await createdComment.save()
    res.status(200).json({ Comment: CommentObjectForFront, status: 1, text: "udało się dodać komentarz" })
}