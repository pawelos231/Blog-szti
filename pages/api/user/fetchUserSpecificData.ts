import type { NextApiRequest, NextApiResponse } from 'next'
import { verify } from '@server/helpers/validateToken'
import { VerifiedToken } from '@interfaces/Token'
import { getFromCache, setToCache } from '@server/cache/cache'
import { SPECIFIC_USER_POSTS } from '@server/cache/constants/PostsConstsRedisKeys'
import { SinglePostFromDatabase } from '@interfaces/PostsInterface'
import {getPostsByUser} from '@server/db/posts'

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {


    const token: string = String(req.headers["authorization"])

    const {Email}: VerifiedToken = await verify(token, process.env.ACCESS_TOKEN_SECRET)
    const {specificPosts, error} = await getPostsByUser(String(Email))
    if(error) throw new Error(error)

    res.status(200).json(specificPosts)
}