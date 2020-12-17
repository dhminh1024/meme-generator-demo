var express = require("express");
require("dotenv").config();
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
const utilsHelper = require("./helpers/utils.helper");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);

// Catch 404
app.use((req, res, next) => {
  const err = new Error("Resource not found");
  err.statusCode = 404;
  next(err);
});

// Error Handler
app.use((err, req, res, next) => {
  utilsHelper.sendResponse(
    res,
    err.statusCode || 500,
    false,
    null,
    { message: err.message },
    "Internal Server Error"
  );
});

module.exports = app;
