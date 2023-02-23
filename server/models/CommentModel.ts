import mongoose from "mongoose";
const { Schema } = mongoose
mongoose.Promise = global.Promise
const CommentSchema = new Schema({
    UserId: {
        type: String,
        required: true
    },
    PostId: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        immutable: true,
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