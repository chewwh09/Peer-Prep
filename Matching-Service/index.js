const dotenv = require("dotenv");
const express = require("express");
require("./db/mongoose");
const matchingRouter = require("./routers/matching");

dotenv.config();

const app = express();
const port = process.env.PORT || 8002;

app.use(express.json());
app.use(matchingRouter);

app.listen(port, () => {
  console.log("Matching Service listening on port", port);
});
