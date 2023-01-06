import {call, put, takeEvery} from 'redux-saga/effects'
import {incrementByTen} from '../../slices/numberExampleSlice'
import { ForkEffect } from 'redux-saga/effects'
const delay = (ms: number) => new Promise(res => setTimeout(res,ms))

function* workNumberSaga(){
    //function to test if saga works
    yield delay(1000)
    yield put(incrementByTen())
}

function* watcherNumberSaga(): Generator<ForkEffect<never>, void, unknown>{
    yield takeEvery('number/increment', workNumberSaga)
}

export default watcherNumberSaga