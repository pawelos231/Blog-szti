import mongoose from "mongoose";
const {Schema} = mongoose
mongoose.Promise = global.Promise
const CommentSchema = new Schema({
    UserId: String,
    PostId: String,
    CreatedAt: String,
    Content: String,
    WhoLiked: [String],
    ParentId: String,
    NestedLevel: Number,
    UpdatedAt: String,
    UserName: String,
})

module.exports = mongoose.models.CommentSchema || mongoose.model('CommentSchema', CommentSchema);