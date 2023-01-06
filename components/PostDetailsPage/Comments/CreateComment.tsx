import { json } from "micro";
import { MutableRefObject, useRef } from "react";
import { CommentsOnPost } from "../../../interfaces/PostsInterface";
import { SinglePostFromDatabase } from "../../../interfaces/PostsInterface";
import { GenerateDateString } from "../../../helpers/NormalizeDate";
const CreateComment = ({ post }: { post: SinglePostFromDatabase }) => {
  const refText: MutableRefObject<any> = useRef(null);

  const AddComment = async (event: any): Promise<void> => {
    event.preventDefault();

    const textOfComment: string = refText.current.value;
    const token: string = localStorage.getItem("profile");
    const date: string = GenerateDateString();

    const CommentObject: CommentsOnPost = {
      PostId: post._id,
      CreatedAt: date,
      Content: textOfComment,
      WhoLiked: ["nikt", "seba"],
      ParentId: "",
      NestedLevel: 0,
      UpdatedAt: "",
      UserName: "",
      childred: null,
    };

    await fetch("/api/posts/Comments/addComment", {
      method: "POST",
      body: JSON.stringify(CommentObject),
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
      <form
        onSubmit={(e: any) => AddComment(e)}
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
  );
};

export default CreateComment;
