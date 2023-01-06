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
        }
    }
})

export const {getCommentsFetch, getCommentsSuccess} = commentsSlice.actions
export default commentsSlice.reducer