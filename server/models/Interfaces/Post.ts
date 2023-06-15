import { Document } from "mongoose";

export interface BlogPost extends Document {
  Title?: string;
  CreatedAt?: Date;
  Tags?: string[];
  Username?: string;
  UserEmail: string;
  ShortDesc?: string;
  Message?: string;
  Category?: string;
  CommentsCount?: number;
  TimeToRead?: number;
  TotalWords?: number;
  Likes?: number;
  WhoLiked?: string[];
}
