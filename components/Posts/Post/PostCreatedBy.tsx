import { usePostContext } from "./PostContext";
const PostCreatedBy = () => {
  const { post } = usePostContext();
  return (
    <div>
      <p className="mt-2 mb-6">
        <span>
          <span className="text-gray-500">Stworzone przez: </span>{" "}
          <span className="font-semibold	"> {post.Username}</span>
        </span>
      </p>
    </div>
  );
};

export default PostCreatedBy;
