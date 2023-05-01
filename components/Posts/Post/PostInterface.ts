import { IPost } from "@interfaces/PostsInterface";
import { ReactNode } from "react";
export interface ApiResponse {
    text: string;
    Name?: string;
  }
  
  export interface LikedPosts {
    flag: number;
    ValueToPass: number;
    itemId: string;
    WhoLiked: Array<string>;
  }
  
  export interface Props {
    post: IPost;
    flag: boolean;
    info?: ReactNode;
  }
  
  export enum HandleLike {
    LikePost = 1,
    UnLikePost = -1,
  }