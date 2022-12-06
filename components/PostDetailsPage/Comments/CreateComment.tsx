import { json } from "micro";
import { MutableRefObject, useRef } from "react";
const CreateComment = () => {
  const refText: MutableRefObject<any> = useRef(null);
  const sub = async () => {
    const textOfComment: string = refText.current.value;
    const token: string = localStorage.getItem("profile");

    await fetch("/api/posts/Comments/addComment", {
      method: "POST",
      body: JSON.stringify(textOfComment),
      headers: {
        Authorization: token,
      },
    })
      .then((res: Response) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <section className="pt-8">
      <p className="text-2xl">Komentarze</p>
      <form onSubmit={() => sub()} className="pt-6 flex flex-col w-[50%]">
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
  );
};

export default CreateComment;
