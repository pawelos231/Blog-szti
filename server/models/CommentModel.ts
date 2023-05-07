import mongoose from "mongoose";
const { Schema } = mongoose
mongoose.Promise = global.Promise
import { Comment } from "./Interfaces/Comment";

const CommentSchema = new Schema<Comment>({
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

module.exports = mongoose.models.CommentSchema || mongoose.model<Comment>('CommentSchema', CommentSchema);