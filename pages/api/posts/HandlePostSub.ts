
import mongoose from 'mongoose';
const BlogPosts = require("@server/models/BlogPosts")
import { IPost } from '@interfaces/PostsInterface';
import { authMiddleware } from '../middleware/authMiddleware';

//add error checking

export default authMiddleware(async function handler(req, res) {
  await mongoose.connect(process.env.DATABASE_URL)
  
  const parsedData: IPost = {...JSON.parse(req.body), Username: req.user.Name, UserEmail: req.user.Email }

  const source: any = await BlogPosts.create(parsedData)

  await source.save()


  res.status(200).json({ message: 'udało się dodać post' })
})
