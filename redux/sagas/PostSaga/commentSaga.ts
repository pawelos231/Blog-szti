import {call, put, takeEvery} from "redux-saga/effects"
import {getCommentsSuccess} from '../../slices/PostsSlices/commentSlice'
/*
Using a redux-saga selector will give you access to the state object (where redux is storing the application state). From the state object you can get the value you need. Example - const userId = yield select(state => state.userData.id)

*/
function* workerComments(action: any){
    console.log(action.payload)
    const url: string = action.payload.url
    const method: string = action.payload.method
    const postId: string = action.payload.body

    const comments = yield call(()=> fetch(url, {
        method: method,
        body: JSON.stringify(postId)
    }))

    const formattedComments = yield comments.json()
    yield put(getCommentsSuccess(formattedComments))
}

function* WatcherComments(){
    yield takeEvery("Comments/getCommentsFetch", workerComments)
}
export default WatcherComments