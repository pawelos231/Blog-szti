import { usePostContext } from "./PostContext";
import { stripTags } from "@helpers/stripTags";

const PostShortDesc = () => {
  const { post } = usePostContext();
  return (
    <div className="mt-4 text-gray-600 w-[70%]">
      {stripTags(post.ShortDesc)}
    </div>
  );
};

export default PostShortDesc;
