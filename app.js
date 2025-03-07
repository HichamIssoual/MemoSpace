const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { ERROR } = require("./utils/res.status.text");
const mongoose = require("mongoose");
const NotesRouters = require("./routes/notes.routes");
const UsersRouters = require("./routes/users.routes");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb Has Connected");
  })
  .catch((err) => {
    console.log("The Error Is: ", err);
  });
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/notes", NotesRouters);
app.use("/api/v1/users", UsersRouters);
app.use("*", (req, res) => {
  res.status(404).json({
    status: ERROR,
    Data: null,
    messgae: "Route Not Found",
    code: 404,
  });
});
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText || ERROR,
    data: err.data || null,
    message: err.message,
    code: err.statusCode || 500,
  });
});
app.listen(PORT, () => {
  console.log("Server has Started");
});
