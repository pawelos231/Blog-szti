import { useEffect, Dispatch, useState } from "react";
import { IPost, IPostComment } from "@interfaces/PostsInterface";
import SkletonLoader from "@helpers/views/SkeletonLoading";
import { useDispatch, useSelector } from "react-redux";
import SingleComment from "./SingleComment/SingleComment";
import { getCommentsFetch } from "@redux/slices/CommentSlice/commentSlice";
import { FetchComments } from "@constants/apisEndpoints";
import { loaderFor } from "../../userDetailsPages/helpers";
import { CommentAtionType } from "@redux/types/ActionTypes";
import CommentsFilter from "./Filter/CommentsFilter";
import { useCallback } from "react";
import { FilterOptionEnum } from "./Filter/FilterData";
import { TransformedComments } from "@helpers/NormalizeComments";
import { FetchBody } from "./Filter/FilterData";

type CommentsProps = { post: IPost };

const Comments = ({ post }: CommentsProps) => {
  const [openedCommentsView, handleopenedCommentsView] =
    useState<boolean>(false);

  const handleOpenCommentsView = useCallback(
    (opened: boolean) => {
      handleopenedCommentsView(opened);
    },
    [openedCommentsView]
  );

  const dispatch: Dispatch<CommentAtionType> = useDispatch();

  const CommentsState = useSelector((state: any) => {
    return state.comments;
  });


  const isLoading: boolean = CommentsState.isLoading;
  const Comments: IPostComment[] = CommentsState.Comments;

  const generateChildren = (
    itemInit: TransformedComments,
    index: number = 0,
    visibility: boolean = openedCommentsView
  ): JSX.Element => {
    if (!itemInit?.children) return;
    const children: TransformedComments[] = itemInit.children;
    let nestedLevel: number = index + 1;

    const CommentsArray: JSX.Element[] = children?.map(
      (item, index: number) => {
        return generateChildren(
          item,
          nestedLevel,
          openedCommentsView ? false : true
        );
      }
    );

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
              handleopenedCommentsView={handleOpenCommentsView}
              openedCommentsView={openedCommentsView}
              depth={index}
              postId={post?._id}
              comment={itemInit}
            />
          ) : (
            <>
              {!visibility ? (
                <SingleComment
                  depth={index}
                  postId={post?._id}
                  comment={itemInit}
                />
              ) : null}
            </>
          )}
        </div>
        {CommentsArray}
      </>
    );
  };
  useEffect(() => {
    const body: FetchBody = {
      postId: post._id,
      filter: FilterOptionEnum.Native,
    };
    dispatch(getCommentsFetch({ url: FetchComments, body, method: "POST" }));
  }, [dispatch]);

  return (
    <section>
      <CommentsFilter postId={post?._id} />
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
