const express = require("express");

const userRouter = require("./routers/user");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log("API-Gateway server is up on port", port);
});
