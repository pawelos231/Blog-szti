import mongoose from "mongoose";
const { Schema } = mongoose;
mongoose.Promise = global.Promise;


const BlogSchema = new Schema({
    Title:  String, 
    CreatedAt: String,
    Tags:   [String],
    Username: String,
    ShortDesc: String,
    Message: String,
  });


  module.exports = mongoose.models.BlogPostsBlogPostsFromUser || mongoose.model('BlogPostsBlogPostsFromUser', BlogSchema);

