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
import { CommentScrollRef } from "./Comments";
import { TransformedComments } from "@helpers/NormalizeComments";
import { IPostComment, IPost } from "@interfaces/PostsInterface";

type CommentsCompProps = {
  Comments: IPostComment[];
  post: IPost;
};

const CommentsComp = memo(
  forwardRef<CommentScrollRef, any>(
    ({ Comments, post }: CommentsCompProps, ref) => {
      const lastCommentRef = useRef<HTMLDivElement>(null);
      const [openedCommentsView, setOpenedCommentsView] =
        useState<boolean>(false);

      useImperativeHandle(ref, () => ({
        scrollBot(): void {
          if (lastCommentRef.current) {
            window.scrollTo({
              top: lastCommentRef.current.offsetHeight,
              left: 0,
              behavior: "smooth",
            });
          }
        },
        scrollTop(): void {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        },
        getHeight(): number {
          return lastCommentRef.current.offsetHeight - 500;
        },
        getPosFromTop(): number {
          return Math.floor(
            lastCommentRef.current.getBoundingClientRect().top +
              window.pageYOffset
          );
        },
      }));

      const handleOpenCommentsView = useCallback((opened: boolean) => {
        setOpenedCommentsView(opened);
      }, []);

      // Recursive function to generate nested comments
      const generateNestedComments = (
        comment: TransformedComments,
        depth: number,
        visibility: boolean
      ): JSX.Element | null => {
        if (!comment?.children) return null;
        const children: TransformedComments[] = comment.children;

        const nestedComments = children.map((child, index) => {
          return generateNestedComments(
            child,
            depth + 1,
            openedCommentsView ? false : true
          );
        });

        if (children.length === 0 && depth === 0) {
          return (
            <SingleComment
              key={comment._id}
              depth={depth}
              postId={post._id}
              comment={comment}
            />
          );
        }

        return (
          <>
            <div style={{ paddingLeft: `${depth * 45}px` }}>
              {children && depth === 0 && children.length !== 0 ? (
                <SingleComment
                  key={comment._id}
                  parentShowCommentsFlag={true}
                  handleopenedCommentsView={handleOpenCommentsView}
                  openedCommentsView={openedCommentsView}
                  depth={depth}
                  postId={post._id}
                  comment={comment}
                />
              ) : (
                <>
                  {!visibility ? (
                    <SingleComment
                      key={comment._id}
                      depth={depth}
                      postId={post._id}
                      comment={comment}
                    />
                  ) : null}
                </>
              )}
            </div>
            {nestedComments}
          </>
        );
      };

      return (
        <div className="flex" ref={lastCommentRef}>
          <div className="ml-2 w-full">
            {Comments.map((comment: TransformedComments) => (
              <div key={comment._id}>
                {generateNestedComments(comment, 0, openedCommentsView)}
              </div>
            ))}
          </div>
        </div>
      );
    }
  )
);

const CommentLoaderComp = () => (
  <div className="bg-red-100 w-screen relative">
    <SkeletonLoader LoaderFor={loaderFor.Comment} />
  </div>
);

export { CommentsComp, CommentLoaderComp };
