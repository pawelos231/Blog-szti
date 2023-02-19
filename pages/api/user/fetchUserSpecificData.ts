import type { NextApiRequest, NextApiResponse } from 'next'
import { verify } from '@server/helpers/validateToken'
import { VerifiedToken } from '@interfaces/Token'
import { get, set } from '@server/cache/cache'
import { SPECIFIC_USER_POSTS } from '@server/cache/constants/PostsConstsRedisKeys'
import { SinglePostFromDatabase } from '@interfaces/PostsInterface'
import {getPostsByUser} from '@server/db/posts'

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const existing: SinglePostFromDatabase[] = await get<SinglePostFromDatabase[]>(SPECIFIC_USER_POSTS)
    if (existing) {
        res.status(200).json(existing)
        return
    }



    const token: string = String(req.headers["authorization"])

    const {Email}: VerifiedToken = await verify(token, process.env.ACCESS_TOKEN_SECRET)
    const {specificPosts, error} = await getPostsByUser(String(Email))
    if(error) throw new Error(error)

    set<SinglePostFromDatabase[]>(SPECIFIC_USER_POSTS, 3600, specificPosts)

    res.status(200).json(specificPosts)
}