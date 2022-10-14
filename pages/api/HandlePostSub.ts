
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
const BlogPosts = require("./models/BlogPosts")



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await mongoose.connect("mongodb://pawelos:OOx5T8Y4I7h7ePPZ@cluster0-shard-00-00.ykqdw.mongodb.net:27017,cluster0-shard-00-01.ykqdw.mongodb.net:27017,cluster0-shard-00-02.ykqdw.mongodb.net:27017/?ssl=true&replicaSet=atlas-kas5e7-shard-0&authSource=admin&retryWrites=true&w=majority")

  const data: any = req.body
  const parsedData: any = JSON.parse(data)
  const source = await BlogPosts.create({Message: parsedData.Message, Title: parsedData.Title, Tags: parsedData.Tags, CreatedAt: parsedData.CreatedAt, Username: parsedData.Username})
  console.log(source)
  await source.save()
  
  
  res.status(200).json({ message: 'udało się dodać post' })
}
