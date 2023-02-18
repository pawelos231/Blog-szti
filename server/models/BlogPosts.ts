import mongoose from "mongoose";
const { Schema } = mongoose;
mongoose.Promise = global.Promise;


const BlogSchema = new Schema({
  Title: {
    type: String,
    maxLength: 40,
    validate: {
      validator: (message: string) => message.length < 40,
      message: (props: any) => `${props.value} is longer than expected`
    }
  },
  CreatedAt: {
    type: Date,
    default: () => Date.now()
  },
  Tags: [String],
  Username: {
    type: String,
    validate: {
      validator: (userName: string) => userName.length !== 0,
      message: (props: any) => `${props.value} must be longer than 0`
    }
  },
  UserEmail: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: (userEmail: string) => userEmail.length !== 0,
      message: (props: any) => `${props.value} must be longer than 0`
    }
  },
  ShortDesc: String,
  Message: String,
  Category: String,
  CommentsCount: Number,
  TimeToRead: Number,
  TotalWords: Number,
  Likes: Number,
  WhoLiked: [String]
});


module.exports = mongoose.models.BlogPosts || mongoose.model('BlogPosts', BlogSchema);

