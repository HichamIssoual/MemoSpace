const express = require("express");
const {
  getAllNotes,
  getSingleNote,
  addNote,
  updateNote,
  deleteNote,
} = require("./../controllers/notes.controller");
const { addNoteValidation } = require("../middlewares/add.note.validation");
const { verifyAuth } = require("../middlewares/verify.auth");

const Routers = express.Router();
Routers.use(verifyAuth);
Routers.route("/").get(getAllNotes).post(addNoteValidation, addNote);
Routers.route("/:id")
  .get(getSingleNote)
  .patch(addNoteValidation, updateNote)
  .delete(deleteNote);
module.exports = Routers;
