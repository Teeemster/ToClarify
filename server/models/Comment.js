const { Schema, model } = require ("mongoose");
const { formatDatetime } = require ("../utils/helpers");

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, "Comment body is required."],
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      get: (dateVal) => formatDatetime(dateVal),
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    taskId: {
      type: String,
      required: [true, "Task ID is required."],
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
