import { IPostComment, IPost } from "@interfaces/PostsInterface";
import { TransformedComments } from "@helpers/NormalizeComments";
import { useState, useCallback } from "react";
import SkletonLoader from "@helpers/views/SkeletonLoading";
import { loaderFor } from "@components/userDetailsPages/helpers";
import SingleComment from "./SingleComment/SingleComment";

type Props = {
  Comments: IPostComment[];
  post: IPost;
};

export const CommentsComp = ({ Comments, post }: Props) => {
  const [openedCommentsView, handleopenedCommentsView] =
    useState<boolean>(false);

  const handleOpenCommentsView = useCallback(
    (opened: boolean) => {
      handleopenedCommentsView(opened);
    },
    [openedCommentsView]
  );

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

  return (
    <div className="flex">
      <div className="ml-2 w-full">
        {Comments.map((item: TransformedComments) => {
          return <>{generateChildren(item)}</>;
        })}
      </div>
    </div>
  );
};

export const CommentLoaderComp = () => (
  <div className="bg-red-100 w-screen relative">
    <SkletonLoader LoaderFor={loaderFor.Comment} />
  </div>
);
