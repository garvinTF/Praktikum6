const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const md5 = require('md5')
const moment = require('moment')
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(6809, () => {
  console.log("Server Running!");
});

module.exports = { app };
