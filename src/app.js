require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/routes");

const app = express();

app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", routes);

module.exports = app;
