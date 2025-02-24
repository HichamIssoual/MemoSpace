const handleAsyncError = require("../middlewares/handle.async.error");
const UserModel = require("../models/user.model");
const errorGenerator = require("../utils/error.generator");
const { ERROR, FAIL, SUCCESS } = require("../utils/res.status.text");
const bcrypt = require("bcryptjs");
const tokenGenerator = require("./../utils/token.generator");
const register = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = errorGenerator.generate(
      "email and password is required",
      400,
      ERROR
    );
    return next(error);
  }
  const userExits = await UserModel.findOne({ email: email });
  if (userExits) {
    const error = errorGenerator.generate("somthing wrong", 400, ERROR);

    return next(error);
  }
  const hashingPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    email: email,
    password: hashingPassword,
  });
  await newUser.save();
  // const token = await tokenGenerator(newUser._id);
  res.status(201).json({
    status: SUCCESS,
    data: {
      user: newUser,
    },
  });
});
const login = handleAsyncError(async (req, res, next) => {});
module.exports = {
  register,
  login,
};
