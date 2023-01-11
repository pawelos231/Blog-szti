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
  const normalizeComments = (
    Comments: CommentsOnPost[],
    id = ""
  ): TransformedComments[] => {
    const newArr = Comments.filter(
      (item: CommentsOnPost) => item["ParentId"] == id
    ).map((item: CommentsOnPost) => ({
      ...item,
      children: normalizeComments(Comments, item._id),
    }));
    return newArr;
  };
  const comms = normalizeComments(Comments);

  //todo combine it with redux state managment

  const generateChildren = (itemInit, i = 0) => {
    const children = itemInit.children;
    let copy = i + 1;
    let newArr = children?.map((item) => generateChildren(item, copy));

    return (
      <>
        <div style={{ paddingLeft: `${i * 55}px` }}>
          <SingleComment postId={post._id} comment={itemInit} />
        </div>
        {newArr}
      </>
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
          {comms.map((item: TransformedComments) => {
            return <>{generateChildren(item)}</>;
          })}
        </div>
      </div>
    </section>
  );
};

export default Comments;
