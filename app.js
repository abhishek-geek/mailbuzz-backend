const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGODB_URI, PORT } = require("./utils/config");

// connection to the MongoDB server

mongoose.connect(
    MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => {
      console.log(`connected to mongodb on port ${PORT}`);
    }
  );

app.use(cors());
app.use(express.json());


module.exports = app;