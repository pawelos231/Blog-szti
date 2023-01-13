import {call, ForkEffect, put, takeEvery} from "redux-saga/effects"
import {getCommentsSuccess} from '../../slices/PostsSlices/commentSlice'
import {CommentsOnPost} from '../../../interfaces/PostsInterface'
/*
Using a redux-saga selector will give you access to the state object (where redux is storing the application state). From the state object you can get the value you need. Example - const userId = yield select(state => state.userData.id)

*/
interface Data {
    url: string,
    method: string,
    body: string
}
type T = {
    payload: Data,
    type: string
}

function* workerCommentsFetchAll(action: T): Generator<any, void, any>{
    const url: string = action.payload.url
    const method: string = action.payload.method
    const postId: string = action.payload.body

    const comments: Response = yield call(()=> fetch(url, {
        method: method,
        body: JSON.stringify(postId)
    }))
    const formattedComments: CommentsOnPost[] = yield comments.json()
    yield put(getCommentsSuccess(formattedComments))
}



function* WatcherComments():Generator<ForkEffect<never>, void, unknown>{
    yield takeEvery("Comments/getCommentsFetch", workerCommentsFetchAll)
}
export default WatcherComments