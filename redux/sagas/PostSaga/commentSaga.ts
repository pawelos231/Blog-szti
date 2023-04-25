import { call, ForkEffect, put, takeEvery, spawn, takeLatest } from "redux-saga/effects"
import { getCommentsSuccess, addCommentSuccess,addCommentFailure } from '../../slices/PostsSlices/commentSlice'
import { IPostComment } from '@interfaces/PostsInterface'


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
        CommentObject: IPostComment, 
        token: string, 
        url: string, 
        method: string 
    }
}
interface FetchCommentsResponse {
    comments: IPostComment[];
  }

function* workerCommentsFetchAll(action: T): Generator<any, void, any> {
    try{
        
        const { payload: { url, method, body } } = action
        const comments: Response = yield call(() => fetch(url, {
            method: method,
            body: JSON.stringify(body)
        }))
        const formattedComments: any[] = yield comments.json()
        yield put(getCommentsSuccess(formattedComments))

    } catch(err){
        console.log(err)
    }
   
}

function* workerAddComment(action: any): Generator<any, void, any> {
    const { payload: { CommentObject, token, url, method } }: AddComment = action
    //yield delay(3000) //FOR TESTINH
    try{
        const AddCommentResult: Response = yield call(() => {
            return (fetch(url, {
                method: method,
                body: JSON.stringify(CommentObject),
                headers: {
                    Authorization: token,
                },
            }))
        })
        const { Comment } = yield AddCommentResult.json()
        yield put(addCommentSuccess(Comment))
    }
    catch(err){
        yield put(addCommentFailure(err));
    }
   

}



function* WatcherAddComment(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest("Comments/addComment", workerAddComment)
}

function* WatcherCommentsFetchAll(): Generator<ForkEffect<never>, void, unknown> {
    yield takeEvery("Comments/getCommentsFetch", workerCommentsFetchAll)
}

function* WatcherComments(): Generator<ForkEffect, void, void> {
    yield spawn(WatcherAddComment)
    yield spawn(WatcherCommentsFetchAll)
}

export default WatcherComments