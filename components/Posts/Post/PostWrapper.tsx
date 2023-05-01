import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const PostWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col cursor-pointer w-[100%] transition-all duration-100 h-[85%] border-gray-300 relative hover:bg-gray-100 hover:dark:bg-black  ">
      {children}
    </div>
  );
};
export default PostWrapper;
