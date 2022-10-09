import { useState } from "react";
const CreatePost = () => {
  const [message, onHandleMessage] = useState<string>("");
  const [title, onHandleTitle] = useState<string>("");

  interface PostObject {
    message: string;
    title: string;
  }
  const SendPost: (e: any) => Promise<void> = async (e) => {
    const PostObjectToSend: PostObject = { message, title };
    e.preventDefault();
    await fetch("/api/HandlePostSub", {
      method: "POST",
      body: JSON.stringify(PostObjectToSend),
    })
      .then((res: Response) => res.json())
      .then((data: any) => console.log(data));
  };

  return (
    <div className="m-10 flex justify-center">
      <form
        onSubmit={(e: React.SyntheticEvent) => SendPost(e)}
        className="flex justify-center flex-col w-[20%] gap-2 text-white"
      >
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onHandleMessage(e.target.value)
          }
          className="bg-black"
          type="text"
          placeholder="message"
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onHandleTitle(e.target.value)
          }
          className="bg-black"
          type="text"
          placeholder="tytuł"
        />
        <input type="submit" className="bg-black " />
      </form>
    </div>
  );
};

export default CreatePost;
