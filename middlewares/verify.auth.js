const jwt = require("jsonwebtoken");
const errorGenerator = require("../utils/error.generator");
const { ERROR } = require("../utils/res.status.text");
const verifyAuth = (req, res, next) => {
  const auth = req.headers["Authorization"] || req.headers["authorization"];
  if (!auth) {
    const error = errorGenerator.generate("must be logged in", 401, ERROR);
    return next(error);
  }
  const token = auth.split(" ").at(1);
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode;
    next();
  } catch (e) {
    const error = errorGenerator.generate("invalid token", 401, ERROR);
    next(error);
  }
};
module.exports = {
  verifyAuth,
};
