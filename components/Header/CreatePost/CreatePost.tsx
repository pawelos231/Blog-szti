import { useState } from "react";
import RespMessage from "./MessageRepsonse/respMessage";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const CreatePost: ({ Handle }) => JSX.Element = ({ Handle }) => {
  const [message, onHandleMessage] = useState<string>("");
  const [title, onHandleTitle] = useState<string>("");
  const [tags, onHandleTags] = useState<Array<string>>([]);
  const [resp, setResp] = useState<ResposnePostAPost>({});
  const [buttonActive, SetButtonActive] = useState<boolean>(true);


  interface PostObject {
    message: string;
    title: string;
    username: string;
    tags: Array<string>;
    CreatedAt: string;
  }
  interface ResposnePostAPost {
    [x: string]: string;
  }

  const TemporaryComponent: (data: ResposnePostAPost) => void = (data) => {
    setTimeout(() => {
      setResp({});
      Handle(false);
    }, 1000);
    setResp(data);
    SetButtonActive(false);
  };

  const GenerateDateString: () => string = () => {
    let today: Date = new Date();
    let date: string =
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
    let date: string = GenerateDateString();
    const PostObjectToSend: PostObject = {
      message,
      title,
      tags,
      username: "siemastian",
      CreatedAt: date,
    };
    e.preventDefault();
    await fetch("/api/HandlePostSub", {
      method: "POST",
      body: JSON.stringify(PostObjectToSend),
    })
      .then((res: Response) => res.json())
      .then((data: ResposnePostAPost) => TemporaryComponent(data));
  };

  return (
    <>
      <div className="m-10 flex justify-center w-[50%] h-[70%] rounded text-black bg-white">
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onHandleTitle(e.target.value)
            }
            className="p-3 rounded-sm text-black border-[1px] border-gray-300"
            type="text"
            placeholder="tytuł"
          />
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onHandleTags(e.target.value.split("#"))
            }
            className="p-3 rounded-sm text-black border-[1px] border-gray-300"
            type="text"
            placeholder="tagi"
          />
          <ReactQuill
            value={message}
            onChange={onHandleMessage}
            theme="snow"
            className="text-black"
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
