const express = require("express");

const app = express();
const port = 4000;

// crud opreation

//Middel Were to parse the request body

app.use(express.json());

const coursesRouter = require("./routes/courses_route");

app.use("/api/courses", coursesRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
