const dotenv = require("dotenv");
const express = require("express");
require("./db/mongoose");
const questionRouter = require("./routers/question");

dotenv.config();

const app = express();
const port = process.env.PORT || 8003;

app.use(express.json());
app.use(questionRouter);

app.listen(port, () => {
  console.log("Question Service server is up on port", port);
});
