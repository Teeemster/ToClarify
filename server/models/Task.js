const { Schema, model } = require("mongoose");
const { formatHours } = require("../utils/helpers");

const taskSchema = new Schema(
  {
    projectId: {
      type: String,
      required: [true, "Project ID is required."],
    },
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["REQUESTED", "INPROGRESS", "COMPLETE"],
      default: "REQUESTED",
      required: [true, "Status is required."],
    },
    estimatedHours: {
      type: Number,
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
  let sum = this.timeLog.reduce((total, obj) => total + parseFloat(obj.hours), 0);
  return formatHours(sum);
});

const Task = model("Task", taskSchema);

module.exports = Task;
