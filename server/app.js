const express = require("express");
require("dotenv").config();
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/profils", require("./routes/profilRoutes"));
app.use("/api/classes", require("./routes/classeRoutes"));

console.log("✅ app.js chargé et routes branchées");
const fs = require('fs');
console.log("📂 Fichiers dans routes/:", fs.readdirSync('./routes'));

module.exports = app;
