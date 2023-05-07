import { IPostComment } from "@interfaces/PostsInterface";

export interface TransformedComments extends IPostComment {
    children: TransformedComments | any;
  }


export const normalizeComments = (
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