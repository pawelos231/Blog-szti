
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
const BlogPosts = require("../../server/models/BlogPosts")



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await mongoose.connect(process.env.DATABASE_URL)

  const data: any = req.body
  
  const parsedData: any = JSON.parse(data)

  const source = await BlogPosts.create({
    Message: parsedData.Message, 
    Title: parsedData.Title, 
    Tags: parsedData.Tags, 
    CreatedAt: parsedData.CreatedAt, 
    Username: parsedData.Username, 
    ShortDesc: parsedData.ShortDesc})

  await source.save()
  
  
  res.status(200).json({ message: 'udało się dodać post' })
}
