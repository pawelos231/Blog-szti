import { GenerateDateString } from "@helpers/NormalizeDate";
import { IPost, IPostComment } from "@interfaces/PostsInterface";
export const CommentObjCreator = (content: string, post_id: string): IPostComment => {
    return {
      PostId: post_id,
      CreatedAt: GenerateDateString(),
      Content: content,
      WhoLiked: [],
      ParentId: "",
      NestedLevel: 0,
      UpdatedAt: "",
      UserName: "",
      childred: null,
    };
  };