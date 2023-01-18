import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import {verify} from '../../../server/helpers/validateToken'
const BlogPosts = require("../../../server/models/BlogPosts")
import { VerifiedToken } from '../../../interfaces/Token'
import {get, set} from '../../../server/cache/cache'
import {SPECIFIC_USER_POSTS} from '../../../server/cache/constants/PostsConstsRedisKeys'
import { SinglePostFromDatabase } from '../../../interfaces/PostsInterface'

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const existing: Array<SinglePostFromDatabase> = await get<Array<SinglePostFromDatabase>>(SPECIFIC_USER_POSTS)
    if(existing !== null){
        res.status(200).json(existing)
        return
    }

    await mongoose.connect(process.env.DATABASE_URL)

    const token: string = String(req.headers["authorization"])

    const decodedData: VerifiedToken = await verify(token, process.env.ACCESS_TOKEN_SECRET)

    const posts: any = await BlogPosts.find({UserEmail: String(decodedData.Email)})

    set<Array<SinglePostFromDatabase>>(SPECIFIC_USER_POSTS, 60, posts)

    res.status(200).json(posts) 
}