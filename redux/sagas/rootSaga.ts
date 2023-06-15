import { all, fork } from "redux-saga/effects";
import WatcherComments from "./CommentsSaga/commentSaga";
export default function* rootSaga() {
  yield all([fork(WatcherComments)]);
}
