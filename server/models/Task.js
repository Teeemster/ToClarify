import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    status: {
      type: String,
      enum: ["Requested", "In Progress", "Completed"],
      default: "Requested",
      required: [true, "Status is required."],
    },
    estimatedHours: {
      type: Number,
      required: [true, "Estimated hours is required."],
    },
    timeLog: [{ type: Schema.Types.ObjectId, ref: "LoggedTime" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// virtual for logging totalTime
TaskSchema.virtual("totalTime").get(function () {
  return this.timeLog.reduce((a, b) => a + b, 0);
});

const Task = model("Task", TaskSchema);

export default Task;
