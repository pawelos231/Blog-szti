import { NextApiRequest, NextApiResponse } from "next";
import { CommentsOnPost } from "../../../../interfaces/PostsInterface";
import mongoose from "mongoose";
const CommentOnPost = require("../../../../server/models/CommentModel")

interface TransformedComments extends CommentsOnPost {
  children: TransformedComments | any;
}

const normalizeComments = (
  Comments: CommentsOnPost[],
  id = ""
): TransformedComments[] => {
  const newArr = Comments.filter(
    (item) => item["ParentId"] == id
  ).map((item) => ({
    ...item,
    children: normalizeComments(Comments, item._id),
  }));
  return newArr;
};


export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  await mongoose.connect(process.env.DATABASE_URL)
  const postId: string = JSON.parse(req.body)
  const data = await CommentOnPost.find({ PostId: postId })
  const comms: TransformedComments[] = normalizeComments(JSON.parse(JSON.stringify(data)))

  res.status(200).json(comms)
}