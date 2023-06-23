import React, { useEffect, Dispatch, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPost, IPostComment } from "@interfaces/PostsInterface";
import { getCommentsFetch } from "@redux/slices/CommentSlice/commentSlice";
import { FetchComments } from "@constants/apisEndpoints";
import { CommentAtionType } from "@redux/types/ActionTypes";
import withDataLoading from "@components/Wrappers/LoadingHOC";
import { CommentLoaderComp, CommentsComp } from "./CommentComponents";
import CommentsFilter from "./Filter/CommentsFilter";
import { FilterOptionEnum } from "./Filter/FilterData";
import { FetchBody } from "./Filter/FilterData";
import CommentScroll from "./Scroll/CommentScroll";
import { useScroll } from "@hooks/useScroll";

type Props = { post: IPost };

export interface CommentScrollRef {
  scrollBot: () => void;
}

const Comments = ({ post }: Props) => {
  const dispatch: Dispatch<CommentAtionType> = useDispatch();

  const CommentsState = useSelector((state: any) => {
    return state.comments;
  });

  const { isLoading, Comments, errorMessage, unauthorized, failure } =
    CommentsState;

  useEffect(() => {
    const body: FetchBody = {
      postId: post._id,
      filter: FilterOptionEnum.Native,
    };
    dispatch(getCommentsFetch({ url: FetchComments, body, method: "POST" }));
  }, [dispatch, post?._id]);

  const ref = useRef<CommentScrollRef>(null);

  const CommentsView = withDataLoading(
    isLoading,
    CommentsComp,
    CommentLoaderComp
  );

  return (
    <section>
      {unauthorized && <p>Unauthorized to fetch comments.</p>}
      {failure && <p>Failed to fetch comments.</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {!unauthorized && !failure && !errorMessage && (
        <>
          <CommentScroll ref={ref} scrollRef={ref} />
          <CommentsFilter postId={post?._id} />
          <CommentsView post={post} Comments={Comments} ref={ref} />
        </>
      )}
    </section>
  );
};

export default Comments;
