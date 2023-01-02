import { useEffect, useState } from "react";
import { SinglePostFromDatabase } from "../../../interfaces/PostsInterface";
const Comments = ({ post }: { post: SinglePostFromDatabase }) => {
  const [comments, setComments] = useState<any>([]);
  const fetchComments = async () => {
    console.log(post._id);
    await fetch("/api/posts/Comments/GetComments", {
      method: "POST",
      body: JSON.stringify(post._id),
    })
      .then((res: Response) => res.json())
      .then((data) => {
        setComments(data);
      })
      .catch((err: any) => console.log(err));
  };
  useEffect(() => {
    fetchComments();
  }, []);
  console.log(comments);
  return (
    <div>
      <div>
        {comments.map((item) => {
          return <div>{item.Content}</div>;
        })}
      </div>
    </div>
  );
};

export default Comments;
