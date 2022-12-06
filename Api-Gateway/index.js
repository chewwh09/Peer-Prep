const express = require("express");
const dotenv = require("dotenv");

const userRouter = require("./routers/user");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log("API-Gateway server is up on port", port);
});
