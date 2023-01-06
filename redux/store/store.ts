import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { configureStore, AnyAction } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import numberReducer from '../slices/numberExampleSlice'
import CommentReducer from '../slices/PostsSlices/commentSlice'

export const saga: SagaMiddleware<object> = createSagaMiddleware();
export const store: ToolkitStore<any, AnyAction, SagaMiddleware<object>[]> =
  configureStore({
    reducer: {
        number: numberReducer,
        comments: CommentReducer 
    },
    middleware: [saga],
  });
