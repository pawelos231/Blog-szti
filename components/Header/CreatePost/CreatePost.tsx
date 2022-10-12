import { useState } from "react";
const CreatePost: ({ Handle }) => JSX.Element = ({ Handle }) => {
  const [message, onHandleMessage] = useState<string>("");
  const [title, onHandleTitle] = useState<string>("");
  //SOMEHOW IMPELEMENT TAGS

  interface PostObject {
    message: string;
    title: string;
    username: string;
    CreatedAt: string;
  }

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
      username: "siemastian",
      CreatedAt: date,
    };
    e.preventDefault();
    await fetch("/api/HandlePostSub", {
      method: "POST",
      body: JSON.stringify(PostObjectToSend),
    })
      .then((res: Response) => res.json())
      .then((data: any) => console.log(data));
  };

  return (
    <div className="m-10 flex justify-center w-[55%] h-[70%] rounded text-black">
      <div
        className="absolute left-2 top-2 text-6xl"
        onClick={() => Handle(false)}
      >
        X
      </div>
      <form
        onSubmit={(e: React.SyntheticEvent) => SendPost(e)}
        className="flex justify-center flex-col w-[70%] gap-2 text-white"
      >
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onHandleTitle(e.target.value)
          }
          className="p-3 rounded-sm text-black"
          type="text"
          placeholder="tytuł"
        />
        <input
          className="p-3 rounded-sm text-black"
          type="text"
          placeholder="tagi"
        />
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onHandleMessage(e.target.value)
          }
          className="p-3 rounded-sm text-black h-[30%]"
          placeholder="message"
        />
        <div className="flex justify-center">
          <input
            type="submit"
            className="bg-white transition-all duration-100 text-black cursor-pointer w-[40%] p-2 hover:bg-black hover:text-white rounded"
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
