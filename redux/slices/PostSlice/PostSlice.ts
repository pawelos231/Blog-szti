import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { IPostComment } from "@interfaces/PostsInterface";

interface CommentsState {
  isLoading: boolean;
  failure: boolean;
  ErrorMessage: string | null;
  Comments: IPostComment[];
}

interface CommentsState extends EntityState<IPostComment> {
  isLoading: boolean;
  failure: boolean;
  ErrorMessage: string | null;
}

const initialState = {
  isLoading: false,
  failure: false,
  ErrorMessage: null,
  Comments: [],
};

const PostSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {
    getPostsFetch: (state, action) => {
      state.isLoading = true;
      return state;
    },
    getPostsSucess: (state, action: PayloadAction<IPostComment[]>) => {
      state.Comments = action.payload;
      state.isLoading = false;
      return state;
    },
    addPostFailure(state, action: PayloadAction<string>) {
      state.failure = true;
      state.ErrorMessage = action.payload;
      return state;
    },
    likePost(state, action: PayloadAction<unknown>) {},
    addPost: (state, action) => {
      state.isLoading = true;
      return state;
    },
    addPostSucess: (state, action: PayloadAction<IPostComment>) => {
      const { payload } = action;
      state.isLoading = false;
      state.Comments = [...state.Comments, payload];
      return state;
    },
  },
});

export const {
  addPost,
  addPostFailure,
  addPostSucess,
  likePost,
  getPostsSucess,
  getPostsFetch,
} = PostSlice.actions;
export default PostSlice.reducer;
