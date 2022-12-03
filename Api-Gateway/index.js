const express = require("express");

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());

app.listen(port, () => {
  console.log("API-Gateway server is up on port", port);
});
