import { useEffect, useState } from "react";
import { SinglePostFromDatabase } from "../../../interfaces/PostsInterface";
import { CommentsOnPost } from "../../../interfaces/PostsInterface";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import SingleComment from "./SingleComment/SingleComment";
import { getCommentsFetch } from "../../../redux/slices/PostsSlices/commentSlice";
const Comments = ({ post }: { post: SinglePostFromDatabase }) => {
  const dispatch: Dispatch<AnyAction> = useDispatch();

  let Comments: CommentsOnPost[] = useSelector((state: any) => {
    return state.comments.Comments;
  });

  interface TransformedComments extends CommentsOnPost {
    children: TransformedComments | any;
  }

  //todo combine it with redux state managment
  //function to generate comments and their children
  const generateChildren = (itemInit: TransformedComments, i = 0) => {
    const children: TransformedComments[] = itemInit.children;
    let copy: number = i + 1;
    let newArr: JSX.Element[] = children?.map((item) =>
      generateChildren(item, copy)
    );

    return (
      <div>
        <div style={{ paddingLeft: `${i * 40}px` }}>
          <SingleComment depth={i} postId={post._id} comment={itemInit} />
        </div>
        {newArr}
      </div>
    );
  };
  useEffect(() => {
    const CommentUrl = "/api/posts/Comments/GetComments";
    dispatch(
      getCommentsFetch({ url: CommentUrl, body: post._id, method: "POST" })
    );
  }, [dispatch]);

  return (
    <section>
      <div className="flex">
        <div className="ml-2">
          {Comments.map((item: TransformedComments) => {
            return <>{generateChildren(item)}</>;
          })}
        </div>
      </div>
    </section>
  );
};

export default Comments;
