import { CommentsOnPost } from "../../../../interfaces/PostsInterface";
import Image from "next/image";
import { shimmer, toBase64 } from "../../../ShimmerEffect/Shimmer";
const SingleComment = ({ comment }: { comment: CommentsOnPost }) => {
  return (
    <>
      <div className="flex">
        <p className="w-[2px] bg-slate-300 text-slate-300 mt-8"></p>
        <div className="w-[50%] flex flex-col pt-8 ml-3">
          <div className=" flex items-center gap-4">
            <div className="overflow-hidden">
              <img
                className="	rounded-full aspect-square w-10"
                src="/dawnofthegreg.jpg"
                alt="temp"
              />
            </div>
            <p className="text-md pb-2 font-semibold">{comment.UserName}</p>
            <p className="text-sm text-gray-500 pb-2">{comment.CreatedAt}</p>
          </div>
          <div className="mt-4">{comment.Content}</div>
        </div>
      </div>
    </>
  );
};

export default SingleComment;
