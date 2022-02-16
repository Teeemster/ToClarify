const { Schema, model } = require ("mongoose");
const { formatHours } = require ("../utils/helpers");

const taskSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
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
      get: (estHoursVal) => formatHours(estHoursVal),
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    timeLog: [{ type: Schema.Types.ObjectId, ref: "LoggedTime" }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// virtual for logging totalTime
taskSchema.virtual("totalTime").get(function () {
  return this.timeLog.reduce((a, b) => a + b, 0);
});

const Task = model("Task", taskSchema);

module.exports = Task;