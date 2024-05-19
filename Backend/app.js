const express = require("express");
const app = new express();
const router = require("./src/routes/api");
const mongoose = require("mongoose");
require("dotenv").config();

const URI =
  "mongodb+srv://jahidhasan:jahid246578@cluster0.u5gekv5.mongodb.net/Task-Manager";

//middleware call
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");

//middleware calling

app.use(
  cors({
    origin: ["https://full-stack-task-manager-w2oq.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // If you're using cookies or sessions
  })
);
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
app.use(xssClean());
app.use(express.json({ limit: "100mb", extended: true }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

//Rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use(limiter);

mongoose
  .connect(URI)
  .then((res) => {
    console.log("Database Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

//API call
app.use("/api/v1", router);

app.use("*", (req, res, next) => {
  res.status(404).json({ status: "fail", data: "not found" });
  next();
});

module.exports = app;
