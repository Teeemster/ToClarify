const { Schema } = require("mongoose");

const loggedTimeSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
});

module.exports = loggedTimeSchema;
