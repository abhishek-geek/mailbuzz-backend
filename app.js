const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// const { MONGODB_URI, PORT } = require("./utils/config");

// connection to the MongoDB server

app.use(cors());
app.use(express.json());


module.exports = app;