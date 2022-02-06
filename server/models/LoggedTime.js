const { Schema, model } = require("mongoose");
const { formatDate, formatHours } = require("../utils/helpers");

const loggedTimeSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
      get: (dateVal) => formatDate(dateVal),
    },
    hours: {
      type: Number,
      required: true,
      get: (hoursVal) => formatHours(hoursVal),
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
