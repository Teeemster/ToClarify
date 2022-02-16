const { Schema, model } = require ("mongoose");
const { formatDate, formatHours } = require ("../utils/helpers");

const loggedTimeSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
      get: (dateVal) => formatDate(dateVal),
    },
    hours: {
      type: Number,
      required: [true, "Number of hours is required."],
      get: (hoursVal) => formatHours(hoursVal),
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

const LoggedTime = model("LoggedTime", loggedTimeSchema);

module.exports = LoggedTime;

