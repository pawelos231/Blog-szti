import { ReactNode } from "react";
import Link from "next/link";
import { usePostContext } from "./PostContext";

type Props = {
  children: ReactNode;
};
const PostWrapper = ({ children }: Props) => {
  const { post } = usePostContext();
  return (
    <Link href={`/postsPage/${post._id}`}>
      <div className="flex flex-col cursor-pointer w-[100%] transition-all duration-100 h-[85%] border-gray-300 relative hover:bg-gray-100 hover:dark:bg-black  ">
        {children}
      </div>
    </Link>
  );
};
export default PostWrapper;
