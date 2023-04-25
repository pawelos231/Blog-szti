import { NextApiRequest, NextApiResponse } from "next";
import { IPostComment } from "@interfaces/PostsInterface";
import {GetAllComments} from "@server/db/posts"

interface TransformedComments extends IPostComment {
  children: TransformedComments | any;
}

const normalizeComments = (
  Comments: IPostComment[],
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

  const {result, error} = await GetAllComments(String(postId))
 

  const comms: TransformedComments[] = normalizeComments(JSON.parse(JSON.stringify(result)))

  if(comms){
    res.status(200).json(comms)
  } 
  else {
    res.status(200).json(error)
  }
  
}