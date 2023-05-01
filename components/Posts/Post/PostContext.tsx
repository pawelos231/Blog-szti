import { createContext, useContext } from "react";
import { IPost } from "@interfaces/PostsInterface";

type Props = { post: IPost };
const PostContext = createContext<Props | null>(null);

export const usePostContext = (): Props => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("Post context failed");
  }
  return context;
};

export default PostContext;
