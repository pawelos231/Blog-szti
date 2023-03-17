import { ComponentType, useEffect, useState } from "react";
import RespMessage from "./MessageRepsonse/respMessage";
import dynamic from "next/dynamic";
import { SinglePostFromDatabase } from "../../../interfaces/PostsInterface";
import { ADD_POST } from "@constants/apisEndpoints";
import { GenerateDateString } from "@helpers/NormalizeDate";
import { stripTags } from "@helpers/stripTags";
import TextEditor from "@UI/TextEditor";

const CreatePost: ({ Handle }) => JSX.Element = ({ Handle }) => {
  const [message, onHandleMessage] = useState<string>("");
  const [title, onHandleTitle] = useState<string>("");
  const [tags, onHandleTags] = useState<Array<string>>([]);
  const [shortOpis, HandleShortOpis] = useState<string>("");
  const [resp, setResp] = useState<ResposnePostAPost>({});
  const [buttonActive, SetButtonActive] = useState<boolean>(true);

  interface ResposnePostAPost {
    [x: string]: string;
  }

  const TemporaryComponent: (data: ResposnePostAPost) => void = (data) => {
    setTimeout(() => {
      setResp({});
      setTimeout(() => {
        Handle(false);
      }, 500);
    }, 1000);
    setResp(data);
  };
  const CountWords = () => {
    return stripTags(message).split(" ").length;
  };

  const SendPost: (e: any) => Promise<void> = async (e) => {
    if (stripTags(message) !== "" && title !== "" && shortOpis !== "") {
      const date: string = GenerateDateString();

      const PostObjectToSend: Omit<SinglePostFromDatabase, "Username"> = {
        Message: message,
        Title: title,
        Tags: tags,
        ShortDesc: shortOpis,
        CreatedAt: date,
        Category: "test",
        TimeToRead: 5,
        TotalWords: CountWords(),
        CommentsCount: 5,
        Likes: 5,
        WhoLiked: [],
      };

      e.preventDefault();
      SetButtonActive(false);

      await fetch(ADD_POST, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("profile"),
        },
        body: JSON.stringify(PostObjectToSend),
      })
        .then((res: Response) => res.json())
        .then((data: ResposnePostAPost) => TemporaryComponent(data));
    }
  };

  useEffect(() => {
    if (typeof localStorage != undefined) {
      console.log(localStorage.getItem("profile"));
    }
  }, []);
  //convert it later to use formik
  return (
    <>
      <div className="m-10 flex justify-center w-[50%] h-[80%] rounded text-black bg-white dark:bg-black dark:border-white border-[1px]">
        <div
          className="absolute left-2 top-2 text-6xl cursor-pointer	dark:text-white"
          onClick={() => Handle(false)}
        >
          X
        </div>
        <form
          onSubmit={(e: React.SyntheticEvent) => SendPost(e)}
          className="flex justify-center flex-col w-[80%] gap-2 text-white"
        >
          <input
            maxLength={80}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onHandleTitle(e.target.value)
            }
            className="p-3 rounded-sm text-black border-[1px] border-gray-300 dark:text-white"
            type="text"
            placeholder="tytuł, max 80 znaków"
          />
          <input
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onHandleTags(e.target.value.split("#"))
            }
            className="p-3 rounded-sm text-black border-[1px] border-gray-300 dark:text-white"
            type="text"
            placeholder="tagi: #siema #gówno"
          />
          <textarea
            required
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              HandleShortOpis(e.target.value)
            }
            className="p-3 rounded-sm text-black border-[1px] border-gray-300 h-[15%] dark:text-white"
            placeholder="krótki opis, max 230 znaków"
            maxLength={230}
          />
          <TextEditor handleMessage={onHandleMessage} />

          {buttonActive ? (
            <div className="flex justify-center mt-12">
              <input
                id="submitButton"
                type="submit"
                className="bg-white transition-all duration-100 text-black cursor-pointer w-[40%] p-2 mt-5 hover:bg-black hover:text-white rounded border-[1px] border-gray-300"
              />
            </div>
          ) : null}
        </form>
      </div>
      {Object.keys(resp).length != 0 ? (
        <RespMessage message={resp.message} />
      ) : null}
    </>
  );
};

export default CreatePost;
