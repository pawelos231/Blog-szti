import { createSlice, PayloadAction, createEntityAdapter, EntityState } from "@reduxjs/toolkit"
import { IPostComment } from "@interfaces/PostsInterface";
import { CommentsState } from "@redux/types/States";


  const initialState: CommentsState = {
    isLoading: false,
    failure: false,
    ErrorMessage: null,
    Unathorized: false,
    Comments: []
  }

  const clearState = (state: CommentsState): void => {
    state.Unathorized = false
    state.failure = false
    state.ErrorMessage = null
    state.isLoading = true
  }
  
const commentsSlice = createSlice({
    name: "Comments",
    initialState,
    reducers: {
        getCommentsFetch : (state, action) =>{
            clearState(state)
            return state;
        },
        getCommentsSuccess: (state, action: PayloadAction<IPostComment[]>) =>{
            state.Comments = action.payload
            state.isLoading = false
            return state;
        },
        addCommentFailure(state, action: PayloadAction<string>){
            state.failure = true
            state.ErrorMessage = action.payload
            return state
        },
        addCommentUnathorized(state, action: PayloadAction<string>){
            state.failure = true
            state.Unathorized = true
            state.ErrorMessage = action.payload
        },
        LikeComment(state, action: PayloadAction<unknown>){

        },
        getFilteredComments(state, action: PayloadAction<unknown>){

        },
        addComment: (state, action) => {
            clearState(state)
            return state
        },
        addCommentSuccess: (state, action: PayloadAction<IPostComment>) => {
            const {payload} = action
            state.isLoading = false
            state.Comments = [...state.Comments, payload
            ]
            return state
        },
        
    }
})

export const {
    getCommentsFetch, 
    getCommentsSuccess, 
    addComment, 
    addCommentSuccess,
    getFilteredComments, 
    addCommentFailure, 
    addCommentUnathorized} = commentsSlice.actions
export default commentsSlice.reducer
