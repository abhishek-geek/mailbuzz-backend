require("dotenv").config();

const PORT = process.env.PORT || 3002;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const COOKIE_KEY = process.env.COOKIE_KEY;

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  COOKIE_KEY,
};
