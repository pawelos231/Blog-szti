import { TransformedComments } from "@helpers/NormalizeComments";

export enum LikeCommentEnum {
    AddLike = "ADD_LIKE",
    Remove = "REMOVE_LIKE",
  }
  
  export type SingleCommentProps = {
    parentShowCommentsFlag?: boolean;
    depth: number;
    comment: TransformedComments;
    openedCommentsView?: boolean;
    handleopenedCommentsView?: any;
    visibility?: boolean;
    postId: string;
  };