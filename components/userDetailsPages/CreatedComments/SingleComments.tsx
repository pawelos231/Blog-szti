import { IPostComment } from "@interfaces/PostsInterface";
type Props = {
  comment: IPostComment;
};
const SingleComment = ({ comment }: Props) => {
  return <div>{comment.UserName}</div>;
};

export default SingleComment;
