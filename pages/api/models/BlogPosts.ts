import mongoose from "mongoose";
const { Schema } = mongoose;
mongoose.Promise = global.Promise;


const BlogSchema = new mongoose.Schema({
    Title:  String, 
    CreatedAt: String,
    Tags:   [String],
    Username: String,
    Message: String,
  });

  module.exports =     mongoose.models.Post || mongoose.model('Blog22', BlogSchema);

