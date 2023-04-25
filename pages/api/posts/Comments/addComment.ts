import { NextApiRequest, NextApiResponse } from "next";
import { IPostComment } from "@interfaces/PostsInterface";
import mongoose from 'mongoose'
import { verify } from '@server/helpers/validateToken'
import { JWTPayload } from "jose";
import { deleteAllRedisValues } from "@server/cache/cache";
const CommentOnPost = require("@server/models/CommentModel")


export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    await mongoose.connect(process.env.DATABASE_URL)
    deleteAllRedisValues()

    const token: string = String(req.headers["authorization"])

    const { Email, Name } = await verify(token, process.env.ACCESS_TOKEN_SECRET)
    
    if (token == "null") {
        console.log("niezalogowany")
        res.status(401).send({ text: "NOT authenticated" })
        return
    }

    const CommentObjectForFront: IPostComment = {
        ...JSON.parse(req.body),
        UserId: Email as string,
        UserName: Name as string
    }

    const {UserId, UserName} = CommentObjectForFront

    if (UserId === "" || UserName === "") {
        res.send("nie mozesz przesyłać wartości będąc nie zalogowanym")
    }

    const createdComment: any = await CommentOnPost.create(CommentObjectForFront)

    await createdComment.save()
    res.status(200).json({ Comment: CommentObjectForFront, status: 1, text: "udało się dodać komentarz" })
}