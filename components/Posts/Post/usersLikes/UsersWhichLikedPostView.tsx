import User from "./User";
import { memo } from "react";
type Props = {
  likedArray: string[];
};
const UsersWhichLikedPostView = ({ likedArray }: Props) => {
  return (
    <div className="flex flex-col items-center w-[100%] gap-2">
      {likedArray
        .filter((item) => {
          return item != null;
        })
        .map((userName: string) => (
          <User userName={userName} />
        ))}
    </div>
  );
};

export default memo(UsersWhichLikedPostView);
