import { Dispatch } from "react";
import { IPost } from "@interfaces/PostsInterface";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_COMMENT_URL } from "@constants/apisEndpoints";
import { AnyAction } from "redux";
import { addComment } from "@redux/slices/CommentSlice/commentSlice";
import { useSelector } from "react-redux";
import { NextRouter, useRouter } from "next/router";
import { CommentObjCreator } from "./CommentsHelpers";
import MessageOnTopOfScreen from "@components/Modals/MessageTopOfScreen";
import { MessageType } from "@constants/helperEnums";
import { useForm } from "react-hook-form";
import { GetToken } from "@server/helpers/GetTokenFromLocalStorage";
import {
  CommentCreationRequest,
  CommentValidator,
} from "lib/validators/comment";
import { yupResolver } from "@hookform/resolvers/yup";

type CommentsProps = { post: IPost };

const CreateComment = ({ post }: CommentsProps) => {
  const [indicator, setIndicator] = useState(false);
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const router: NextRouter = useRouter();

  const CommentState = useSelector((state: any) => {
    return state.comments;
  });

  if (CommentState.Unathorized && !!CommentState.ErrorMessage) {
    router.push("/");
  }

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<CommentCreationRequest>({
    resolver: yupResolver(CommentValidator),
    defaultValues: {
      content: "",
    },
  });

  const AddComment = async (): Promise<void> => {
    const textOfComment: string = watch("content");

    const sendComment = (): Promise<unknown> => {
      return new Promise((resolve, reject) => {
        try {
          const response = dispatch(
            addComment({
              CommentObject: CommentObjCreator(textOfComment, post._id),
              UserAuthToken: GetToken(),
              method: "POST",
              url: ADD_COMMENT_URL,
            })
          );
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    };
    setIndicator(true);
    await sendComment();
  };

  return (
    <>
      {!CommentState.failure ? (
        <MessageOnTopOfScreen
          message="Udało się dodać komentarz!"
          duration={1000}
          status={MessageType.Normal}
          indicator={indicator}
        />
      ) : (
        <MessageOnTopOfScreen
          message="Nie udało się dodać komentarza!"
          duration={1000}
          status={MessageType.Error}
          indicator={indicator}
        />
      )}

      <section className="pt-8">
        <p className="text-2xl">Komentarze</p>
        <form
          onSubmit={handleSubmit(AddComment)}
          className="pt-6 flex flex-col w-[50%]"
        >
          <textarea
            className="border-gray-300 rounded-sm border-[1px] p-2 	"
            placeholder="wpisz komentarz"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
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
