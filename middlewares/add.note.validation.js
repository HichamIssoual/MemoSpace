const { body } = require("express-validator");
const addNoteValidation = [
  body("userId").notEmpty().withMessage("user id field is require"),
  body("title").notEmpty().withMessage("title field is require"),
  body("description").notEmpty().withMessage("description field is require"),
];
module.exports = {
  addNoteValidation: addNoteValidation,
};
