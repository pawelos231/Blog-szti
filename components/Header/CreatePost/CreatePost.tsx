import { ComponentType, useEffect, useState } from "react";
import RespMessage from "./MessageRepsonse/respMessage";
import dynamic from "next/dynamic";
import { SinglePostFromDatabase } from "../../../interfaces/PostsInterface";
const ReactQuillTextEditor: ComponentType<any> = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

import "react-quill/dist/quill.snow.css";

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

  function stripTags(original: string) {
    return original.replace(/(<([^>]+)>)/gi, "");
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

  const GenerateDateString: () => string = () => {
    const today: Date = new Date();
    const date: string =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1 <= 9
        ? "0" + Number(today.getMonth() + 1)
        : today.getMonth() + 1) +
      "-" +
      (today.getDate() <= 9 ? "0" + Number(today.getDate()) : today.getDate());
    return date;
  };

  const SendPost: (e: any) => Promise<void> = async (e) => {
    if (stripTags(message) !== "" && title !== "" && shortOpis !== "") {
      const date: string = GenerateDateString();

      const PostObjectToSend: SinglePostFromDatabase = {
        Message: message,
        Title: title,
        Tags: tags,
        ShortDesc: shortOpis,
        Username: "",
        CreatedAt: date,
        Category: "test",
        TimeToRead: 5,
        TotalWords: 150,
        CommentsCount: 5,
        Likes: 5,
        WhoLiked: ["seba", "no by??o"],
      };

      e.preventDefault();
      SetButtonActive(false);

      await fetch("/api/posts/HandlePostSub", {
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

  return (
    <>
      <div className="m-10 flex justify-center w-[50%] h-[80%] rounded text-black bg-white">
        <div
          className="absolute left-2 top-2 text-6xl cursor-pointer	"
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
            className="p-3 rounded-sm text-black border-[1px] border-gray-300"
            type="text"
            placeholder="tytu??, max 80 znak??w"
          />
          <input
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onHandleTags(e.target.value.split("#"))
            }
            className="p-3 rounded-sm text-black border-[1px] border-gray-300"
            type="text"
            placeholder="tagi: #siema #g??wno"
          />
          <textarea
            required
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              HandleShortOpis(e.target.value)
            }
            className="p-3 rounded-sm text-black border-[1px] border-gray-300 h-[15%]"
            placeholder="kr??tki opis, max 230 znak??w"
            maxLength={230}
          />
          <ReactQuillTextEditor
            value={message}
            onChange={onHandleMessage}
            theme="snow"
            className="text-black h-[25%]"
          />
          {buttonActive ? (
            <div className="flex justify-center mt-12">
              <input
                id="submitButton"
                type="submit"
                className="bg-white transition-all duration-100 text-black cursor-pointer w-[40%] p-2 hover:bg-black hover:text-white rounded border-[1px] border-gray-300"
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
