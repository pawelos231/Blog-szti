import { call, ForkEffect, put, takeEvery, fork, takeLatest } from "redux-saga/effects"
import { getCommentsSuccess, addCommentSuccess } from '../../slices/PostsSlices/commentSlice'
import { CommentsOnPost } from '@interfaces/PostsInterface'


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

type AddComment = {
    payload: { 
        CommentObject: CommentsOnPost, 
        token: string, 
        url: string, 
        method: string 
    }
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
    const { payload: { CommentObject, token, url, method } }: AddComment = action
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



function* WatcherAddComment(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest("Comments/addComment", workerAddComment)
}

function* WatcherCommentsFetchAll(): Generator<ForkEffect<never>, void, unknown> {
    yield takeEvery("Comments/getCommentsFetch", workerCommentsFetchAll)
}

function* WatcherComments(): Generator<ForkEffect, void, void> {
    yield fork(WatcherAddComment)
    yield fork(WatcherCommentsFetchAll)
}

export default WatcherComments