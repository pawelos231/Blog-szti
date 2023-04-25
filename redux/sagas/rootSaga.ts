import {all, fork} from 'redux-saga/effects'
import WatcherComments from './PostSaga/commentSaga'
export default function* rootSaga() {
    yield all([WatcherComments()]);
  }