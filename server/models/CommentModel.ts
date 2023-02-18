import mongoose from "mongoose";
const { Schema } = mongoose
mongoose.Promise = global.Promise
const CommentSchema = new Schema({
    UserId: {
        type: String,
    },
    PostId: {
        type: String,
    },
    CreatedAt: {
        type: String,
        default: () => Date.now()
    },
    Content: String,
    WhoLiked: [String],
    ParentId: String,
    NestedLevel: Number,
    UpdatedAt: String,
    UserName: String,
})

module.exports = mongoose.models.CommentSchema || mongoose.model('CommentSchema', CommentSchema);