
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
const BlogPosts = require("../../../server/models/BlogPosts")
import {verify} from '../../../server/helpers/validateToken'
import { SinglePostFromDatabase } from '../../../interfaces/PostsInterface';

//add error checking

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await mongoose.connect(process.env.DATABASE_URL)
  

  const data: any = req.body
  const token: string = String(req.headers["authorization"])
  let decodedData: any = await verify(token, process.env.ACCESS_TOKEN_SECRET)

  const parsedData: SinglePostFromDatabase = JSON.parse(data)

  const source: any = await BlogPosts.create({
    Message: parsedData.Message, 
    Title: parsedData.Title, 
    Tags: parsedData.Tags,
    CreatedAt: parsedData.CreatedAt, 
    Username: decodedData.Name,
    UserEmail: decodedData.Email, 
    ShortDesc: parsedData.ShortDesc,
    Category: parsedData.Category,
    CommentsCount: parsedData.CommentsCount,
    TimeToRead: parsedData.TimeToRead,
    TotalWords: parsedData.TotalWords,
    Likes: parsedData.Likes,
    WhoLiked: parsedData.WhoLiked
  
  })

  await source.save()
  
  
  res.status(200).json({ message: 'udało się dodać post' })
}
