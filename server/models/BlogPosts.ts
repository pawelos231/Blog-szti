import mongoose from "mongoose";
const { Schema } = mongoose;
import { BlogPost } from "./Interfaces/Post";
mongoose.Promise = global.Promise;

const BlogSchema = new Schema<BlogPost>({
  Title: {
    type: String,
    maxLength: 40,
    validate: {
      validator: (message: string) => message.length < 40,
      message: (props: any) => `${props.value} is longer than expected`,
    },
  },
  CreatedAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  Tags: [String],
  Username: {
    type: String,
    validate: {
      validator: (userName: string) => userName.length !== 0,
      message: (props: any) => `${props.value} must be longer than 0`,
    },
  },
  UserEmail: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: (userEmail: string) => userEmail.length !== 0,
      message: (props: any) => `${props.value} must be longer than 0`,
    },
  },
  ShortDesc: {
    type: String,
    required: true,
    maxLength: 250,
    validate: {
      validator: (message: string) => message.length < 250,
      message: (props: any) => `${props.value} is longer than expected`,
    },
  },
  Message: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  CommentsCount: Number,
  TimeToRead: Number,
  TotalWords: Number,
  Likes: Number,
  WhoLiked: [String],
});

module.exports =
  mongoose.models.BlogPosts ||
  mongoose.model<BlogPost>("BlogPosts", BlogSchema);
