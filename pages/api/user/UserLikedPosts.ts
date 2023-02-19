import { NextApiResponse, NextApiRequest } from "next";
import { VerifiedToken } from '@interfaces/Token'
import { verify } from '@server/helpers/validateToken'
import { getLikedUserPosts } from "@server/db/posts";
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const token: string = String(req.headers["authorization"])
    const {Name}: VerifiedToken = await verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log(Name)
    const {likedUserPosts, error}: any = await getLikedUserPosts(String(Name))

    res.status(200).json(likedUserPosts)
}