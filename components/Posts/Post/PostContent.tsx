import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const PostContent = ({ children }: Props) => {
  return <div className="flex w-[100%] justify-between ">{children}</div>;
};

export default PostContent;
