const { Schema, model } = require("mongoose");
const { formatDatetime } = require("../utils/helpers");

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
      type: Number,
      required: [true, "User ID is required."],
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
