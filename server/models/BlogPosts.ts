import mongoose from "mongoose";
const { Schema } = mongoose;
mongoose.Promise = global.Promise;


const BlogSchema = new Schema({
    Title:  String, 
    CreatedAt: String,
    Tags:   [String],
    Username: String,
    UserEmail: String,
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

