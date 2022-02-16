import { Schema, model } from "mongoose";
import { formatDatetime } from "../utils/helpers";

const commentSchema = new Schema(
  {
    commentBody: {
      type: String,
      required: [true, "Comment body is required."],
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      get: (dateVal) => formatDatetime(dateVal),
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Comment = model("Comment", commentSchema);

export default Comment;
