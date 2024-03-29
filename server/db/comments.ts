import clientPromise from "./mongo";
import { IPostComment } from "@interfaces/PostsInterface";
import { ResponseWrapper } from "./interfaces/ResponseInterface";
import { deleteAllRedisValues } from "@server/cache/cache";
const CommentOnPost = require("@server/models/CommentModel");
require("../cache/index");

type Comments = Array<IPostComment>;
type AddCommentRes = {
  result: {
    status: number;
    text: string;
  };
  error?: string | undefined;
};

export const GetAllComments = async (
  postId: string
): ResponseWrapper<Comments> => {
  try {
    await clientPromise();

    const result: Comments = await CommentOnPost.find({ PostId: postId }).sort({
      CreatedAt: -1,
    });
    return { result };
  } catch (error) {
    return { error, result: undefined };
  }
};

export const GetAllCommentsOldest = async (
  postId: string
): ResponseWrapper<Comments> => {
  try {
    await clientPromise();

    const result: Comments = await CommentOnPost.find({ PostId: postId }).sort({
      CreatedAt: 1,
    });
    return { result };
  } catch (error) {
    return { error, result: undefined };
  }
};

export const GetAllCommentsMostLiked = async (
  postId: string
): ResponseWrapper<Comments> => {
  try {
    await clientPromise();

    const result: Comments = await CommentOnPost.aggregate([
      { $match: { PostId: postId } },
      { $addFields: { likesCount: { $size: "$WhoLiked" } } },
      { $sort: { likesCount: -1 } },
    ]).cache();

    return { result };
  } catch (error) {
    return { error, result: undefined };
  }
};

export const GetAllCommentsLeastLiked = async (
  postId: string
): ResponseWrapper<Comments> => {
  try {
    await clientPromise();

    const result: Comments = await CommentOnPost.aggregate([
      { $match: { PostId: postId } },
      { $addFields: { likesCount: { $size: "$WhoLiked" } } },
      { $sort: { likesCount: 1 } },
    ]).cache();
    return { result };
  } catch (error) {
    return { error, result: undefined };
  }
};

export const CreateCommentDB = async (
  CommentObjectForFront: IPostComment
): Promise<AddCommentRes> => {
  try {
    deleteAllRedisValues();

    const createdComment: any = await CommentOnPost.create(
      CommentObjectForFront
    );

    await createdComment.save();

    return { result: { status: 1, text: "udało się dodać komentarz" } };
  } catch (error) {
    return { result: undefined, error };
  }
};

export const LikeCommentDB = async (
  arrOfLikes: string[],
  commentId: string
): ResponseWrapper<string> => {
  try {
    await clientPromise();

    await CommentOnPost.updateOne(
      {
        _id: commentId,
      },
      {
        $set: {
          WhoLiked: arrOfLikes,
        },
      }
    );
    return { result: "successufully liked post" };
  } catch (error) {
    return { error, result: undefined };
  }
};

export const CreatedCommentsDB = async (
  userEmail: string,
  PAGE_SIZE: number,
  skipAmount: number
): ResponseWrapper<Comments> => {
  try {
    const pipeline = [
      { $match: { UserId: userEmail } },
      { $skip: (skipAmount - 1) * PAGE_SIZE },
      { $limit: PAGE_SIZE },
    ];

    const result: Comments = await CommentOnPost.aggregate(pipeline);

    return { result };
  } catch (error) {
    return { result: undefined, error };
  }
};

export const CountCreatedCommentsDB = async (
  userEmail: string
): ResponseWrapper<number> => {
  try {
    const result: number = await CommentOnPost.countDocuments({
      UserId: userEmail,
    });

    return { result };
  } catch (error) {
    return { result: undefined, error };
  }
};
