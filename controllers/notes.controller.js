const { validationResult } = require("express-validator");
const handleAsyncError = require("../middlewares/handle.async.error");
const NoteModel = require("../models/note.model");
const errorGenerator = require("../utils/error.generator");
const { ERROR, SUCCESS, FAIL } = require("./../utils/res.status.text");
const getAllNotes = handleAsyncError(async (req, res, next) => {
  const allNotes = await NoteModel.find(
    {},
    "userId title description color createAt"
  );
  res.status(200).json({
    status: SUCCESS,
    data: {
      notes: allNotes,
    },
  });
});
const getSingleNote = handleAsyncError(async (req, res, next) => {
  const noteId = req.params.id;
  const singleNote = await NoteModel.findById(noteId);
  if (!singleNote) {
    const error = errorGenerator.generate("Note Note Found", 404, FAIL);
    return next(error);
  }
  res.status(200).json({
    status: SUCCESS,
    data: {
      note: singleNote,
    },
  });
});
const addNote = handleAsyncError(async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = errorGenerator.generate(error.array().at(0).msg, 400, ERROR);
    return next(err);
  }
  const { userId, title, description, color } = req.body;
  const newNote = new NoteModel({
    userId: userId,
    title: title,
    description: description,
    color: color,
  });
  await newNote.save();
  res.status(201).json({
    status: SUCCESS,
    message: "Notes created successfully",
    data: {
      note: newNote,
    },
  });
});
const updateNote = handleAsyncError(async (req, res, next) => {
  const noteId = req.params.id;
  const currentNote = await NoteModel.findById(noteId);
  if (!currentNote) {
    const error = errorGenerator.generate("Note Note Found", 404, FAIL);
    return next(error);
  }
  const updateNote = await NoteModel.findOneAndUpdate(
    { _id: noteId },
    { $set: { ...req.body } },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: SUCCESS,
    message: "Note updated successfully",
    data: {
      updatedNote: updateNote,
    },
  });
});
const deleteNote = handleAsyncError(async (req, res, next) => {
  const noteId = req.params.id;
  const currentNote = await NoteModel.findById(noteId);
  if (!currentNote) {
    const error = errorGenerator.generate("Note Note Found", 404, FAIL);
    return next(error);
  }
  await NoteModel.deleteOne({ _id: noteId });
  res.status(200).json({
    status: SUCCESS,
    message: "Note Deleted successfully",
  });
});
module.exports = {
  getAllNotes,
  getSingleNote,
  addNote,
  updateNote,
  deleteNote,
};
