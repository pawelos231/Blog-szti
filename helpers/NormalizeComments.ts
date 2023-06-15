import { IPostComment } from "@interfaces/PostsInterface";

export interface TransformedComments extends IPostComment {
  children: TransformedComments[];
}

export const normalizeComments = (
  comments: IPostComment[],
  parentId = ""
): TransformedComments[] => {
  const filteredComments = comments.filter(
    (comment) => comment.ParentId === parentId
  );

  const transformedComments = filteredComments.map((comment) => {
    const children = normalizeComments(comments, comment._id);
    return {
      ...comment,
      children,
    };
  });

  return transformedComments;
};
