import { NextApiRequest, NextApiResponse } from "next";
import { GetAllComments, GetAllCommentsOldest, GetAllCommentsLeastLiked, GetAllCommentsMostLiked } from "@server/db/comments";
import { FilterOptionEnum } from "@components/PostDetailsPage/Comments/Filter/FilterData";
import { normalizeComments } from "@helpers/NormalizeComments";
import { FetchBody } from "@components/PostDetailsPage/Comments/Filter/FilterData";


export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  

  const {postId, filter}: FetchBody = JSON.parse(req.body)

  const FilterComments = async <F extends Function>(getFilteredComments: F) => {

    const {result, error} = await getFilteredComments(String(postId))
    const comms = normalizeComments(JSON.parse(JSON.stringify(result)))
    if(error){
      return res.status(500).json(error)
    }
    return res.status(200).json(comms)
  }


  switch(filter){
    case FilterOptionEnum.Native: {
      return FilterComments(GetAllComments)
    }
    case FilterOptionEnum.Newest: {
      return FilterComments(GetAllComments)
    }
    case FilterOptionEnum.Oldest: {
      return FilterComments(GetAllCommentsOldest)
    }
    case FilterOptionEnum.MostLiked: {
      return FilterComments(GetAllCommentsMostLiked)
    }
    case FilterOptionEnum.LeastLiked: {
      return FilterComments(GetAllCommentsLeastLiked)
    }
    default: {
      return res.status(500).json("unknown error")
    }
  }

  
}