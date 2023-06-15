import mongoose from "mongoose";
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
import { Comment } from "./Interfaces/Comment";

const CommentSchema = new Schema<Comment>({
  UserId: {
    type: String,
    required: true,
  },
  PostId: {
    type: String,
    required: [true, "PostId is required"],
  },
  CreatedAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  Content: {
    type: String,
    required: [true, "Content is required"],
  },
  WhoLiked: [String],
  ParentId: String,
  NestedLevel: Number,
  UpdatedAt: {
    type: Date,
    validate: {
      validator: function (this: Comment, updatedAt: Date) {
        return !updatedAt || !this.CreatedAt || updatedAt >= this.CreatedAt;
      },
      message:
        "UpdatedAt must be a valid date and greater than or equal to CreatedAt",
    },
  },
  UserName: String,
});

module.exports =
  mongoose.models.CommentSchema ||
  mongoose.model<Comment>("CommentSchema", CommentSchema);
