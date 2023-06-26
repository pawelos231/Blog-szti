import {
  call,
  ForkEffect,
  put,
  takeEvery,
  spawn,
  takeLatest,
} from "redux-saga/effects";
import {
  getCommentsSuccess,
  addCommentSuccess,
  addCommentFailure,
  addCommentUnathorized,
} from "../../slices/CommentSlice/commentSlice";
import { TActionComment, AddComment } from "@redux/types/comments/CommentSaga";
import { IPostComment } from "@interfaces/PostsInterface";
import * as Statues from "@constants/statusCodes";

type GenFuncType = Generator<any, void, any>;
type Statutes = (typeof Statues)[keyof typeof Statues];

function* workerCommentsFetchAll(action: TActionComment): GenFuncType {
  try {
    const {
      payload: { url, method, body },
    } = action;
    console.log(body, method, url);
    const comments: Response = yield call(() =>
      fetch(url, {
        method: method,
        body: JSON.stringify(body),
      })
    );
    const formattedComments: IPostComment[] = yield comments.json();
    yield put(getCommentsSuccess(formattedComments));
  } catch (err) {
    console.log(err);
  }
}

function* workerAddComment(action: any): GenFuncType {
  const {
    payload: { CommentObject, UserAuthToken, url, method },
  }: AddComment = action;

  try {
    const AddCommentResult: Response = yield call(() => {
      return fetch(url, {
        method: method,
        body: JSON.stringify(CommentObject),
        headers: {
          Authorization: UserAuthToken,
        },
      });
    });

    const resStatus: Statutes = AddCommentResult.status as Statutes;

    if (resStatus === 401) {
      yield put(addCommentUnathorized(AddCommentResult.statusText));
    } else {
      const { Comment } = yield AddCommentResult.json();
      yield put(addCommentSuccess(Comment));
    }
  } catch (err) {
    yield put(addCommentFailure(err.message));
  }
}

function* WatcherAddComment(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest("Comments/addComment", workerAddComment);
}

function* WatcherCommentsFetchAll(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery("Comments/getCommentsFetch", workerCommentsFetchAll);
}

function* WatcherComments(): Generator<ForkEffect, void, void> {
  yield spawn(WatcherCommentsFetchAll);
  yield spawn(WatcherAddComment);
}

export default WatcherComments;
