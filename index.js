const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const httpStatusText = require("./utils/httpStatusText");
require("dotenv").config();
const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log("mongodb connect successfuly");
});

const app = express();
const port = process.env.PORT || 4000;

//enable cors

app.use(cors());

// crud opreation

//Middel Were to parse the request body

app.use(express.json());

const coursesRouter = require("./routes/courses_route");
const usersRouter = require("./routes/users_route");

app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.all("*", (req, res) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "route not found",
  });
});

//middelwere handel exception
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(err.statusCode || 500).json({
    status: err.statusText || httpStatusText.ERROR,
    message: err.message || null,
  });
});
