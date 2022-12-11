const dotenv = require("dotenv");
const express = require("express");

require("./db/mongoose");
const historyRouter = require("./routers/history");

dotenv.config();

const app = express();
const port = process.env.PORT || 8004;

app.use(express.json());
app.use(historyRouter);

app.listen(port, () => {
  console.log("History service is listening on port", port);
});
