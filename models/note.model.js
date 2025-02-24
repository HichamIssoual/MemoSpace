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
    default: "#fff",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("notes", noteSchema);
