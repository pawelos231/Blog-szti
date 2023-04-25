import { createSlice, PayloadAction } from "@reduxjs/toolkit"



const commentsSlice = createSlice({
    name: "Comments",
    initialState: {
        isLoading: false,
        failure: false,
        ErrorMessage: null,
        Comments: [],
       
    },
    reducers: {
        getCommentsFetch : (state, action) =>{
            state.isLoading = true
            return state;
        },
        getCommentsSuccess: (state, action) =>{
            state.Comments = action.payload
            state.isLoading = false
            return state;
        },
        addCommentFailure(state, action){
            state.failure = true
            state.ErrorMessage = action.payload
        },
        addComment: (state, action) => {
            state.isLoading = true
            return state
        },
        addCommentSuccess: (state, action) => {
            const {payload} = action
            state.isLoading = false
            state.Comments = [...state.Comments, payload
            ]
            return state
        },
        
    }
})

export const {getCommentsFetch, getCommentsSuccess, addComment, addCommentSuccess, addCommentFailure} = commentsSlice.actions
export default commentsSlice.reducer