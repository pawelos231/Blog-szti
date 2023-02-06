import { useEffect, Dispatch } from "react";
import {
  SinglePostFromDatabase,
  CommentsOnPost,
} from "../../../interfaces/PostsInterface";
import SkletonLoader from "../../../helpers/views/SkeletonLoading";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import SingleComment from "./SingleComment/SingleComment";
import { getCommentsFetch } from "../../../redux/slices/PostsSlices/commentSlice";
import { loaderFor } from "../../userDetails/helpers";
const Comments = ({ post }: { post: SinglePostFromDatabase }) => {
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const CommentsState = useSelector((state: any) => {
    return state.comments;
  });
  const isLoading = CommentsState.isLoading;
  const Comments: CommentsOnPost[] = CommentsState.Comments;
  console.log(isLoading, Comments);

  interface TransformedComments extends CommentsOnPost {
    children: TransformedComments | any;
  }

  const generateChildren = (
    itemInit: TransformedComments,
    i = 0
  ): JSX.Element => {
    const children: TransformedComments[] = itemInit.children;
    let copy: number = i + 1;
    let newArr: JSX.Element[] = children?.map((item) =>
      generateChildren(item, copy)
    );

    return (
      <>
        <div style={{ paddingLeft: `${i * 45}px` }}>
          <SingleComment depth={i} postId={post._id} comment={itemInit} />
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
      {!isLoading ? (
        <>
          <div className="flex">
            <div className="ml-2 w-full">
              {Comments.map((item: TransformedComments) => {
                return <>{generateChildren(item)}</>;
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-red-100 w-screen  relative">
          <SkletonLoader LoaderFor={loaderFor.Comment} />
        </div>
      )}
    </section>
  );
};

export default Comments;
