import { usePostContext } from "./PostContext";
const PostTitle = () => {
  const { post } = usePostContext();
  return <h1 className="text-3xl font-semibold w-[70%]">{post.Title}</h1>;
};

export default PostTitle;
