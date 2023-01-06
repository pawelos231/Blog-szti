import { useEffect, useState } from "react";
import { SinglePostFromDatabase } from "../../../interfaces/PostsInterface";
import { CommentsOnPost } from "../../../interfaces/PostsInterface";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import SingleComment from "./SingleComment/SingleComment";
import { getCommentsFetch } from "../../../redux/slices/PostsSlices/commentSlice";
const Comments = ({ post }: { post: SinglePostFromDatabase }) => {
  const [comments, setComments] = useState<any>([]);

  const CommentUrl = "/api/posts/Comments/GetComments";

  const fetchComments = async () => {
    console.log(post._id);
    await fetch("/api/posts/Comments/GetComments", {
      method: "POST",
      body: JSON.stringify(post._id),
    })
      .then((res: Response) => res.json())
      .then((data: CommentsOnPost[]) => {
        setComments(data);
      })
      .catch((err: any) => console.log(err));
  };

  const dispatch: Dispatch<AnyAction> = useDispatch();

  const state = useSelector((state: any) => {
    return state.comments;
  });

  console.log(state);
  useEffect(() => {
    dispatch(
      getCommentsFetch({ url: CommentUrl, body: post._id, method: "POST" })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchComments();
  }, []);

  console.log(state);
  return (
    <section>
      <div className="flex">
        <div className="ml-2">
          {comments.map((item: CommentsOnPost) => {
            return <SingleComment comment={item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Comments;
