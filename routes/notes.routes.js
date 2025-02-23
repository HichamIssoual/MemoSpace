const express = require("express");
const {
  getAllNotes,
  getSingleNote,
  addNote,
  updateNote,
  deleteNote,
} = require("./../controllers/notes.controller");
const Routers = express.Router();
Routers.route("/").get(getAllNotes).post(addNote);
Routers.route("/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);
module.exports = Routers;
