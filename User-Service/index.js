const dotenv = require("dotenv");
const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log("User Service server is up on port " + port);
});
