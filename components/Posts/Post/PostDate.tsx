import { usePostContext } from "./PostContext";
const PostDate = () => {
  const { post } = usePostContext();
  return (
    <p className="absolute right-0 top-0">
      {post.CreatedAt.toString().split("T")[0]}
    </p>
  );
};

export default PostDate;
