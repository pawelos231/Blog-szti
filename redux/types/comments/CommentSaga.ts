import { IPostComment } from "@interfaces/PostsInterface"

interface ICommentFetch {
    url: string,
    method: string,
    body: string
}

export type TActionComment = {
    payload: ICommentFetch,
    type: string
}

export type AddComment = {
    payload: { 
        CommentObject: IPostComment, 
        UserAuthToken: string, 
        url: string, 
        method: string 
    }
}
export interface FetchCommentsResponse {
    comments: IPostComment[];
  }