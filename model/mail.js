const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const mailSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
    minLength: 3,
  },
  cc: {
    type: String,
    minLength: 3,
  },
  bcc: {
    type: String,
    minLength: 3,
  },
  subject: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  nextDate: {
    type: Date,
    required: true,
  },
  prevDate: {
    type: Date,
  },
  body: {
    type: String,
  },
});

mailSchema.plugin(uniqueValidator);

mailSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject.__v;
    delete returnObject._id;
  },
});

module.exports = mongoose.model("Mail", mailSchema);
