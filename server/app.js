const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));

module.exports = app;
