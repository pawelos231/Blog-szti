import { IPostComment } from "@interfaces/PostsInterface";
import Link from "next/link";
import { LikeCommentEnum } from "./types";
import { useState } from "react";
import { isUserAuthorized } from "@helpers/IsUserAuthorized";
import { StatusType } from "@helpers/IsUserAuthorized";
import { LIKE_COMMENT } from "@constants/apisEndpoints";
import { POST } from "@constants/reqMeth";
import { GetToken } from "@server/helpers/GetTokenFromLocalStorage";
import { useRouter } from "next/router";
import { ThumbUpAltOutlined, ThumbUpAltRounded } from "@material-ui/icons";
import NavbarForUserDesktop from "@components/userDetailsPages/NavbarForUser/NavbarForUserDesktop";

type Props = {
  comment: IPostComment;
};

const SingleCommentUserProfile = ({ comment }: Props) => {
  const [like, handleAddLike] = useState<boolean>(false);
  const router = useRouter();

  const handleLike = async (flag: LikeCommentEnum) => {
    handleAddLike(!like);

    const LikeComObj = {
      WhoLiked: comment.WhoLiked,
      flag,
      commentId: comment._id,
    };

    await fetch(LIKE_COMMENT, {
      method: POST,
      headers: {
        Authorization: GetToken(),
      },
      body: JSON.stringify(LikeComObj),
    })
      .then((res: Response) => {
        isUserAuthorized(res.status as StatusType, router);
        return res.json();
      })
      .then((data) => console.log(data));
  };

  return (
    <>
      <NavbarForUserDesktop />
      <section className="flex flex-col justify-center items-center mb-4">
        <div className="flex w-[100%] justify-center">
          <p className="w-[2px] bg-slate-300 text-slate-300 mt-8"></p>
          <div className="w-[70%] flex flex-col pt-8 ml-3">
            <div className=" flex items-center gap-4">
              <div className="overflow-hidden">
                <Link href={`/userDetails/${comment.UserId}`}>
                  <img
                    className="	rounded-full aspect-square w-10"
                    src="/dawnofthegreg.jpg"
                    alt="temp"
                  />
                </Link>
              </div>
              <Link href={`/userDetails/${comment.UserId}`}>
                <p className="text-md pb-2 font-semibold">{comment.UserName}</p>
              </Link>
              <p className="text-sm text-gray-500 pb-2">
                {comment.CreatedAt.toString().split("T")[0]}
              </p>
            </div>
            <div className="mt-4 ">{comment.Content}</div>
          </div>
        </div>

        <div className="flex gap-5 items-center w-[70%] justify-start mt-2">
          <div
            onClick={() => handleLike(LikeCommentEnum.AddLike)}
            className="text-2xl"
          >
            {!like ? (
              <div onClick={() => handleLike(LikeCommentEnum.AddLike)}>
                <ThumbUpAltOutlined fontSize="inherit" />
              </div>
            ) : (
              <div onClick={() => handleLike(LikeCommentEnum.Remove)}>
                <ThumbUpAltRounded fontSize="inherit" />
              </div>
            )}
          </div>
          <div>{comment.WhoLiked.length}</div>
        </div>
      </section>
    </>
  );
};

export default SingleCommentUserProfile;
