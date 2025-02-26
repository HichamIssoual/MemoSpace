const handleAsyncError = require("../middlewares/handle.async.error");
const UserModel = require("../models/user.model");
const errorGenerator = require("../utils/error.generator");
const { ERROR, FAIL, SUCCESS } = require("../utils/res.status.text");
const bcrypt = require("bcryptjs");
const tokenGenerator = require("./../utils/token.generator");
const validator = require("validator");
const register = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = errorGenerator.generate(
      "email and password are required",
      400,
      ERROR
    );
    return next(error);
  }
  if (!validator.isEmail(email)) {
    const error = errorGenerator.generate(
      "must enter a valid email",
      400,
      ERROR
    );
    return next(error);
  }
  if (!validator.isStrongPassword(password)) {
    const error = errorGenerator.generate(
      "must enter a strong password",
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
  const token = tokenGenerator({ id: newUser._id });
  res.status(201).json({
    status: SUCCESS,
    data: {
      user: newUser,
      token: token,
    },
  });
});
const login = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = errorGenerator.generate(
      "email and password are required",
      400,
      ERROR
    );
    return next(error);
  }
  if (!validator.isEmail(email)) {
    const error = errorGenerator.generate(
      "must enter a valid email",
      400,
      ERROR
    );
    return next(error);
  }
  const userExits = await UserModel.findOne({ email: email });
  if (!userExits) {
    const error = errorGenerator.generate("Somthing wrong", 400, FAIL);
    return next(error);
  }
  console.log(userExits.password);
  const matchedPassword = await bcrypt.compare(password, userExits.password);
  if (userExits && matchedPassword) {
    const token = tokenGenerator({ id: userExits._id });
    res.status(200).json({
      status: SUCCESS,
      data: {
        user: userExits,
        token: token,
      },
    });
  }
});
module.exports = {
  register,
  login,
};
