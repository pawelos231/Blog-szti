import { IPostComment, IPost } from "@interfaces/PostsInterface";
import { TransformedComments } from "@helpers/NormalizeComments";
import {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import SkeletonLoader from "@helpers/views/SkeletonLoading";
import { loaderFor } from "@components/userDetailsPages/helpers";
import SingleComment from "./SingleComment/SingleComment";
import { memo } from "react";

type CommentsCompProps = {
  Comments: IPostComment[];
  post: IPost;
};

export const CommentsComp = memo(
  forwardRef<any, any>(({ Comments, post }, ref) => {
    const lastCommentRef = useRef<HTMLDivElement>(null);
    const [openedCommentsView, setOpenedCommentsView] =
      useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      scrollBot() {
        if (lastCommentRef.current) {
          window.scrollTo({
            top: lastCommentRef.current.offsetHeight,
            left: 0,
            behavior: "smooth",
          });
        }
      },
    }));

    const handleOpenCommentsView = useCallback((opened: boolean) => {
      setOpenedCommentsView(opened);
    }, []);

    const generateChildren = (
      itemInit: TransformedComments,
      index: number = 0,
      visibility: boolean = openedCommentsView
    ): JSX.Element | null => {
      if (!itemInit?.children) return null;
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
          <SingleComment
            key={index}
            depth={index}
            postId={post._id}
            comment={itemInit}
          />
        );
      }

      return (
        <>
          <div style={{ paddingLeft: `${index * 45}px` }}>
            {children && index === 0 && children.length !== 0 ? (
              <SingleComment
                key={index}
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
                    key={index}
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
      <div className="flex" ref={lastCommentRef}>
        <div className="ml-2 w-full">
          {Comments.map((item: TransformedComments) => {
            return <div key={item?._id}>{generateChildren(item)}</div>;
          })}
        </div>
      </div>
    );
  })
);

export const CommentLoaderComp = () => (
  <div className="bg-red-100 w-screen relative">
    <SkeletonLoader LoaderFor={loaderFor.Comment} />
  </div>
);
