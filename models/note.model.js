const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, "must add user Id"],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    default: "#fff",
  },
  createAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});
module.exports = mongoose.model("notes", noteSchema);
