import { useEffect, Dispatch, useState } from "react";
import {
  SinglePostFromDatabase,
  CommentsOnPost,
} from "@interfaces/PostsInterface";
import SkletonLoader from "../../../helpers/views/SkeletonLoading";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import SingleComment from "./SingleComment/SingleComment";
import { getCommentsFetch } from "../../../redux/slices/PostsSlices/commentSlice";
import { FetchComments } from "../../../constants/apisEndpoints";
import { loaderFor } from "../../userDetails/helpers";
const Comments = ({ post }: { post: SinglePostFromDatabase }) => {
  const [openedCommentsView, handleopenedCommentsView] =
    useState<boolean>(false);

  const dispatch: Dispatch<AnyAction> = useDispatch();
  const CommentsState = useSelector((state: any) => {
    return state.comments;
  });

  const isLoading: boolean = CommentsState.isLoading;
  const Comments: CommentsOnPost[] = CommentsState.Comments;

  interface TransformedComments extends CommentsOnPost {
    children: TransformedComments | any;
  }

  const generateChildren = (
    itemInit: TransformedComments,
    index: number = 0,
    visibility: boolean = openedCommentsView
  ): JSX.Element => {
    const children: TransformedComments[] = itemInit.children;
    let nestedLevel: number = index + 1;
    let newArr: JSX.Element[] = children?.map((item, index: number) => {
      if (openedCommentsView) return generateChildren(item, nestedLevel, false);
      else return generateChildren(item, nestedLevel, true);
    });
    if (children && index === 0 && children.length === 0) {
      return (
        <SingleComment depth={index} postId={post._id} comment={itemInit} />
      );
    }
    return (
      <>
        <div style={{ paddingLeft: `${index * 45}px` }}>
          {children && index == 0 && children.length !== 0 ? (
            <SingleComment
              parentShowCommentsFlag={true}
              handleopenedCommentsView={handleopenedCommentsView}
              openedCommentsView={openedCommentsView}
              depth={index}
              postId={post._id}
              comment={itemInit}
            />
          ) : (
            <>
              {!visibility ? (
                <SingleComment
                  depth={index}
                  postId={post._id}
                  comment={itemInit}
                />
              ) : null}
            </>
          )}
        </div>
        {newArr}
      </>
    );
  };
  useEffect(() => {
    dispatch(
      getCommentsFetch({ url: FetchComments, body: post._id, method: "POST" })
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
