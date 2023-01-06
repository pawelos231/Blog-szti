import { CommentsOnPost } from "../../../../interfaces/PostsInterface";
const SingleComment = ({ comment }: { comment: CommentsOnPost }) => {
  return <div>{comment.Content}</div>;
};

export default SingleComment;
