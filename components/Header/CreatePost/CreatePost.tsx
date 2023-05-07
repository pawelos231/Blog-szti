import { useCallback, useState } from "react";
import MessageOnTopOfScreen from "@components/Modals/MessageTopOfScreen";
import { ADD_POST } from "@constants/apisEndpoints";
import { stripTags } from "@helpers/stripTags";
import TextEditor from "@UI/TextEditor";
import { MessageType } from "@constants/helperEnums";
import { createPostObject } from "./PostCreatorHelper";
import { GetToken } from "@server/helpers/GetTokenFromLocalStorage";
import { memo } from "react";
interface ResposnePostAPost {
  [x: string]: string;
}

const CreatePost = ({ Handle }): JSX.Element => {
  const [message, onHandleMessage] = useState<string>("");
  const [title, onHandleTitle] = useState<string>("");
  const [tags, onHandleTags] = useState<Array<string>>([]);
  const [shortOpis, HandleShortOpis] = useState<string>("");
  const [resp, setResp] = useState<ResposnePostAPost>({});
  const [buttonActive, SetButtonActive] = useState<boolean>(true);
  const [showComp, handleShowComp] = useState<boolean>(false);

  const TemporaryComponent: (data: ResposnePostAPost) => void = (data) => {
    setTimeout(() => {
      setResp({});
      setTimeout(() => {
        Handle(false);
      }, 500);
    }, 1000);
    setResp(data);
  };

  const HandleMessageMemo = useCallback(
    (message: string) => {
      onHandleMessage(message);
    },
    [message]
  );
  console.log(message);

  const CountWords = (): number => {
    return stripTags(message).split(" ").length;
  };

  const SendPost: (e: any) => Promise<void> = async (e) => {
    if (stripTags(message) !== "" && title !== "" && shortOpis !== "") {
      e.preventDefault();
      SetButtonActive(false);

      await fetch(ADD_POST, {
        method: "POST",
        headers: {
          Authorization: GetToken(),
        },
        body: JSON.stringify(
          createPostObject(message, title, tags, shortOpis, CountWords)
        ),
      })
        .then((res: Response) => res.json())
        .then((data: ResposnePostAPost) => {
          handleShowComp(true);
          TemporaryComponent(data);
        });
    }
  };

  return (
    <>
      <div className="m-10 flex justify-center w-[50%] h-[80%] rounded text-black bg-white dark:bg-black dark:border-white border-[1px]">
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
          <TextEditor handleMessage={HandleMessageMemo} />

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

      <MessageOnTopOfScreen
        message={resp.message}
        status={MessageType.Normal}
        duration={1000}
        indicator={showComp}
      />
    </>
  );
};

export default memo(CreatePost);
