const jwt = require("jsonwebtoken");
const tokenGenerator = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};
module.exports = tokenGenerator;
