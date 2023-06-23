import { useCallback, useState } from "react";
import MessageOnTopOfScreen from "@components/Modals/MessageTopOfScreen";
import { ADD_POST } from "@constants/apisEndpoints";
import { stripTags } from "@helpers/stripTags";
import { MessageType } from "@constants/helperEnums";
import { createPostObject } from "./PostCreatorHelper";
import { GetToken } from "@server/helpers/GetTokenFromLocalStorage";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { PostValidator, PostCreationRequest } from "lib/validators/post";
import { yupResolver } from "@hookform/resolvers/yup";
import TextEditor from "@UI/TextEditor";

interface ResposnePostAPost {
  [x: string]: string;
}

const CreatePost = ({ Handle } = null): JSX.Element => {
  const [resp, setResp] = useState<ResposnePostAPost>({});
  const [buttonActive, SetButtonActive] = useState<boolean>(true);
  const [showComp, handleShowComp] = useState<boolean>(false);
  const [desc, setDesc] = useState<string>("");

  const setMemoDesc = useCallback((value: string) => {
    setDesc(value);
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }, // Get the form validation errors
  } = useForm<PostCreationRequest>({
    resolver: yupResolver(PostValidator),
    defaultValues: {
      title: "",
      tags: "",
      shortDescription: "",
    },
  });

  const TemporaryComponent: (data: ResposnePostAPost) => void = (data) => {
    setTimeout(() => {
      setResp({});
      setTimeout(() => {
        Handle(false);
      }, 500);
    }, 1000);
    setResp(data);
  };

  const CountWords = (): number => {
    return stripTags(watch("tags")).split(" ").length;
  };

  const SendPost = async () => {
    SetButtonActive(false);

    const payload = JSON.stringify(
      createPostObject(
        desc,
        watch("title"),
        watch("tags"),
        watch("shortDescription"),
        CountWords
      )
    );
    await fetch(ADD_POST, {
      method: "POST",
      headers: {
        Authorization: GetToken(),
      },
      body: payload,
    })
      .then((res: Response) => res.json())
      .then((data: ResposnePostAPost) => {
        handleShowComp(true);
        TemporaryComponent(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="m-10 flex justify-center w-[50%] h-[80%] rounded text-black bg-white dark:bg-black dark:border-white border-[1px]">
        <form
          onSubmit={handleSubmit(SendPost)}
          className="flex justify-center flex-col w-[80%] gap-2 text-white"
        >
          <input
            {...register("title")}
            className="p-3 rounded-sm text-black border-[1px] border-gray-300 dark:text-white"
            type="text"
            placeholder="tytuł, max 80 znaków"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}

          <input
            {...register("tags")}
            className="p-3 rounded-sm text-black border-[1px] border-gray-300 dark:text-white"
            type="text"
            placeholder="tagi: #siema #gówno"
          />
          {errors.shortDescription && (
            <p className="text-red-500">{errors.shortDescription.message}</p>
          )}
          <textarea
            {...register("shortDescription")}
            className="p-3 rounded-sm text-black border-[1px] border-gray-300 h-[15%] dark:text-white"
            placeholder="krótki opis, max 230 znaków"
          />
          <TextEditor HandleChange={setMemoDesc} />

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
