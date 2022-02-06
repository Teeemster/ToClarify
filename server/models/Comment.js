const { Schema, model } = require("mongoose");
const { formatDatetime } = require("../utils/helpers");

const commentSchema = new Schema(
  {
    commentBody: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      get: (dateVal) => formatDatetime(dateVal),
    },
    userId: {
      type: Number,
      required: true,
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
