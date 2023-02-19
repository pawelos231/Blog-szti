import { NextApiRequest, NextApiResponse } from "next";
import { CommentsOnPost } from "@interfaces/PostsInterface";
import {GetAllComments} from "@server/db/posts"

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
  const postId: string = JSON.parse(req.body)
  const {comments, error} = await GetAllComments(String(postId))
  if(error) throw new Error(error)
  const comms: TransformedComments[] = normalizeComments(JSON.parse(JSON.stringify(comments)))
  if(comms){
    res.status(200).json(comms)
  } else {
    res.status(200).json(error)
  }
  
}