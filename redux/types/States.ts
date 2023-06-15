import { IPostComment } from "@interfaces/PostsInterface";

export interface CommentsState {
  isLoading: boolean;
  failure: boolean;
  ErrorMessage: string | null;
  Unathorized: boolean;
  Comments: IPostComment[];
}
