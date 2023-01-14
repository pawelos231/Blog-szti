import { createSlice, PayloadAction } from "@reduxjs/toolkit"



const commentsSlice = createSlice({
    name: "Comments",
    initialState: {
        isLoading: false,
        Comments: []
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

export const {getCommentsFetch, getCommentsSuccess, addComment, addCommentSuccess} = commentsSlice.actions
export default commentsSlice.reducer