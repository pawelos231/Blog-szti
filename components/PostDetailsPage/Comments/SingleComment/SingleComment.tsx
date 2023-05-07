import { useState, useRef, MutableRefObject, memo, useEffect } from "react";
import { IPostComment } from "@interfaces/PostsInterface";
import { GenerateDateString } from "@helpers/NormalizeDate";
import { ADD_COMMENT_URL } from "@constants/apisEndpoints";
import { POST } from "@constants/reqMeth";
import { ThumbUpAltOutlined, ThumbUpAltRounded } from "@material-ui/icons";
import { SingleCommentProps, LikeCommentEnum } from "./types";
import { GetToken } from "@server/helpers/GetTokenFromLocalStorage";
import { LIKE_COMMENT } from "@constants/apisEndpoints";
import { isUserAuthorized, StatusType } from "@helpers/IsUserAuthorized";
import { useRouter } from "next/router";

const SingleComment = ({
  parentShowCommentsFlag = false,
  depth,
  comment,
  openedCommentsView = false,
  handleopenedCommentsView = null,
  visibility = true,
  postId,
}: SingleCommentProps) => {
  const [opened, handleOpen] = useState<boolean>(false);
  const [like, handleAddLike] = useState<boolean>(false);
  const valueOfReply = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const cheIfCommentLikedAlready = (): void => {
    const ifLiked: string | undefined = comment.WhoLiked.find(
      (item: string) => item == localStorage.getItem("userName")
    );
    if (ifLiked) {
      handleAddLike(true);
    }
  };

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

  const ReplyToComment = async (): Promise<void> => {
    const date: string = GenerateDateString();
    const token: string = localStorage.getItem("profile");
    const textReply: string = valueOfReply.current.value;

    const CommentObject: IPostComment = {
      PostId: postId,
      CreatedAt: date,
      Content: textReply,
      WhoLiked: [],
      ParentId: comment._id,
      NestedLevel: 0,
      UpdatedAt: "",
      UserName: "",
      childred: null,
    };
    await fetch(ADD_COMMENT_URL, {
      method: POST,
      body: JSON.stringify(CommentObject),
      headers: {
        Authorization: token,
      },
    })
      .then((res: Response) => res.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    cheIfCommentLikedAlready();
  }, []);

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
            <p className="text-sm text-gray-500 pb-2">
              {comment.CreatedAt.toString().split("T")[0]}
            </p>
          </div>
          <div className="mt-4">{comment.Content}</div>
        </div>
      </div>
      <div className="flex items-center gap-12">
        <div className="flex gap-5 items-center">
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
        <button
          onClick={() => handleOpen(!opened)}
          className=" font-semibold mt-2 mb-4 p-2  w-[10%] rounded-sm"
        >
          Odpowiedz
        </button>
      </div>
      {parentShowCommentsFlag ? (
        <button
          onClick={() => handleopenedCommentsView(!openedCommentsView)}
          className=" font-semibold mt-2 mb-4 p-2  w-[30%] rounded-sm"
        >
          {!openedCommentsView ? <>Pokaz Odpowiedzi</> : <>Ukryj Odpowiedzi</>}
        </button>
      ) : null}

      {opened ? (
        <div className="ml-10 flex-col w-[40%] ">
          <textarea
            ref={valueOfReply}
            className="border-[1px]	 border-black	w-full h-[10%]"
          />
          <div className="flex justify-end">
            <button
              onClick={() => handleOpen(!open)}
              className="m-2 p-2 pl-10 pr-10 rounded-md border-[1px] border-red-500"
            >
              anuluj
            </button>
            <button
              onClick={() => ReplyToComment()}
              className="m-2 pl-10 pr-10 rounded-md border-[1px] border-green-700"
            >
              prześlij
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default memo(SingleComment);
