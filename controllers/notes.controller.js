const handleAsyncError = require("../middlewares/handle.async.error");

const getAllNotes = handleAsyncError(async (req, res, next) => {});
const getSingleNote = handleAsyncError(async (req, res, next) => {});
const addNote = handleAsyncError(async (req, res, next) => {});
const updateNote = handleAsyncError(async (req, res, next) => {});
const deleteNote = handleAsyncError(async (req, res, next) => {});
module.exports = {
  getAllNotes,
  getSingleNote,
  addNote,
  updateNote,
  deleteNote,
};
