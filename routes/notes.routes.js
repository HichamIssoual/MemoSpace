const express = require("express");
const {
  getAllNotes,
  getSingleNote,
  addNote,
  updateNote,
  deleteNote,
} = require("./../controllers/notes.controller");
const {addNoteValidation} = require("../middlewares/add.note.validation");
const Routers = express.Router();
Routers.route("/").get(getAllNotes).post(addNoteValidation, addNote);
Routers.route("/:id")
  .get(getSingleNote)
  .patch(addNoteValidation, updateNote)
  .delete(deleteNote);
module.exports = Routers;
