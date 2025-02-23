// import modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
// using modules
dotenv.config();
const PORT = process.env.PORT;
const app = express();
// body parses
app.use(express.json());
// loger midllewars
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    data: "Notes",
  });
});
app.listen(PORT, () => {
  console.log("Server has Started");
});
