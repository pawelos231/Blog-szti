import { Dispatch, MutableRefObject, useRef } from "react";
import { CommentsOnPost } from "../../../interfaces/PostsInterface";
import { SinglePostFromDatabase } from "../../../interfaces/PostsInterface";
import { GenerateDateString } from "../../../helpers/NormalizeDate";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddCommentEndpoint } from "../../../constants/apisEndpoints";
import { AnyAction } from "redux";
import { addComment } from "../../../redux/slices/PostsSlices/commentSlice";
const CreateComment = ({ post }: { post: SinglePostFromDatabase }) => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const [comunicat, setComunicat] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(0);

  const refText: MutableRefObject<any> = useRef(null);

  const AddCommentFunc = async (event: any): Promise<void> => {
    event.preventDefault();

    const textOfComment: string = refText.current.value;
    const token: string = localStorage.getItem("profile");
    const date: string = GenerateDateString();

    const CommentObject: CommentsOnPost = {
      PostId: post._id,
      CreatedAt: date,
      Content: textOfComment,
      WhoLiked: [],
      ParentId: "",
      NestedLevel: 0,
      UpdatedAt: "",
      UserName: "",
      childred: null,
    };
    const awaitForReponse = () => {
      return new Promise((resolve, reject) => {
        resolve(
          dispatch(
            addComment({
              CommentObject,
              token,
              method: "POST",
              url: AddCommentEndpoint,
            })
          )
        );
      });
    };
    await awaitForReponse();
    setComunicat(true);
    setStatus(1); //temporary solution
    setTimeout(() => {
      setComunicat(false);
    }, 1000);
  };

  return (
    <>
      {comunicat ? (
        <>
          {status === 1 ? (
            <p className="text-black top-36 fixed left-0 text-center text-3xl w-full">
              <span
                id="comm"
                className="bg-green-600 rounded-sm p-2 text-white"
              >
                Udało się dodać komentarz
              </span>
            </p>
          ) : (
            <p className="text-black top-36 fixed left-0 text-center text-3xl w-full">
              <span id="comm" className="bg-red-600 rounded-sm p-2 text-white">
                Nie udało się dodać komentarz
              </span>
            </p>
          )}
        </>
      ) : null}

      <section className="pt-8">
        <p className="text-2xl">Komentarze</p>
        <form
          onSubmit={(e: any) => AddCommentFunc(e)}
          className="pt-6 flex flex-col w-[50%]"
        >
          <textarea
            className="border-gray-300 rounded-sm border-[1px] p-2 	"
            placeholder="wpisz komentarz"
            ref={refText}
          />
          <input
            className="self-start mt-4 p-2 w-48 bg-black text-white transition-all duration-100 cursor-pointer rounded-sm hover:scale-105 hover:bg-gray-400 hover:text-black	"
            type="submit"
          />
        </form>
      </section>
    </>
  );
};

export default CreateComment;
