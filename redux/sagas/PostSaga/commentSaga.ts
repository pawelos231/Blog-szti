import { call, ForkEffect, put, takeEvery } from "redux-saga/effects"
import { getCommentsSuccess, addCommentSuccess } from '../../slices/PostsSlices/commentSlice'
import { CommentsOnPost } from '../../../interfaces/PostsInterface'
/*
Using a redux-saga selector will give you access to the state object (where redux is storing the application state). From the state object you can get the value you need. Example - const userId = yield select(state => state.userData.id)

*/

const delay = (ms: number) => new Promise((res, rej) => setTimeout(res, ms))

interface Data {
    url: string,
    method: string,
    body: string
}
type T = {
    payload: Data,
    type: string
}

function* workerCommentsFetchAll(action: T): Generator<any, void, any> {
    const { payload: { url, method, body } } = action
    const comments: Response = yield call(() => fetch(url, {
        method: method,
        body: JSON.stringify(body)
    }))
    const formattedComments: any[] = yield comments.json()
    yield put(getCommentsSuccess(formattedComments))
}

function* workerAddComment(action: any): Generator<any, void, any> {
    const { payload: { CommentObject, token, url, method } } = action
    //yield delay(3000) //FOR TESTINH
    const resultOfAddComment: Response = yield call(() => {
        return (fetch(url, {
            method: method,
            body: JSON.stringify(CommentObject),
            headers: {
                Authorization: token,
            },
        }))
    })
    const { Comment } = yield resultOfAddComment.json()
    yield put(addCommentSuccess(Comment))

}



function* WatcherComments(): Generator<ForkEffect<never>, void, unknown> {
    yield takeEvery("Comments/addComment", workerAddComment)
    yield takeEvery("Comments/getCommentsFetch", workerCommentsFetchAll)
}
export default WatcherComments