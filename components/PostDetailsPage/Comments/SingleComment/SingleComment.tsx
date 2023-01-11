import { CommentsOnPost } from "../../../../interfaces/PostsInterface";
import { GenerateDateString } from "../../../../helpers/NormalizeDate";
import { useState, useRef, MutableRefObject } from "react";
const SingleComment = ({ comment, postId }) => {
  const [opened, handleOpen] = useState<boolean>(false);
  const valueOfReply: MutableRefObject<any> = useRef(null);

  const ReplyToComment = async (): Promise<void> => {
    const date: string = GenerateDateString();
    const token: string = localStorage.getItem("profile");
    const textReply: string = valueOfReply.current.value;
    const CommentObject: CommentsOnPost = {
      PostId: postId,
      CreatedAt: date,
      Content: textReply,
      WhoLiked: ["nikt", "seba"],
      ParentId: comment._id,
      NestedLevel: 0,
      UpdatedAt: "",
      UserName: "",
      childred: null,
    };
    await fetch("/api/posts/Comments/addComment", {
      method: "POST",
      body: JSON.stringify(CommentObject),
      headers: {
        Authorization: token,
      },
    })
      .then((res: Response) => res.json())
      .then((data) => console.log(data));
  };
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
      <button
        onClick={() => handleOpen(!opened)}
        className=" font-semibold mt-2 mb-4 p-2  w-[10%] rounded-sm"
      >
        Odpowiedz
      </button>
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

export default SingleComment;
