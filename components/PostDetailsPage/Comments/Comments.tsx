import React, { useEffect, Dispatch } from "react";
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

type CommentsProps = { post: IPost };

const Comments = ({ post }: CommentsProps) => {
  const dispatch: Dispatch<CommentAtionType> = useDispatch();

  const CommentsState = useSelector((state: any) => {
    return state.comments;
  });

  const isLoading: boolean = CommentsState.isLoading;
  const Comments: IPostComment[] = CommentsState.Comments;

  useEffect(() => {
    const body: FetchBody = {
      postId: post._id,
      filter: FilterOptionEnum.Native,
    };
    dispatch(getCommentsFetch({ url: FetchComments, body, method: "POST" }));
  }, [dispatch]);

  const CommentsView = withDataLoading(
    isLoading,
    CommentsComp,
    CommentLoaderComp
  );

  return (
    <section>
      <CommentsFilter postId={post?._id} />
      <CommentsView post={post} Comments={Comments} />
    </section>
  );
};

export default Comments;
