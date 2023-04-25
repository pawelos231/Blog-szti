
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
const BlogPosts = require("@server/models/BlogPosts")
import { verify } from '@server/helpers/validateToken'
import { IPost } from '@interfaces/PostsInterface';

//add error checking

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await mongoose.connect(process.env.DATABASE_URL)


  const token: string = String(req.headers["authorization"])
  const {Name, Email}: any = await verify(token, process.env.ACCESS_TOKEN_SECRET)
  
  if (token == "null") {
    console.log("niezalogowany")
    res.status(401).send({ text: "NOT authenticated" })
    return
  }
  
  const parsedData: IPost = {...JSON.parse(req.body), Username: Name, UserEmail: Email }

  const source: any = await BlogPosts.create(parsedData)

  await source.save()


  res.status(200).json({ message: 'udało się dodać post' })
}
