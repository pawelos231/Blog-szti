import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const PostHeader = ({ children }: Props) => {
  return <div className="flex">{children}</div>;
};

export default PostHeader;
