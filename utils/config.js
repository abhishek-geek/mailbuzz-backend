require("dotenv").config();

const PORT = process.env.PORT || 3002;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const COOKIE_KEY = process.env.COOKIE_KEY;
const MAIL_USERNAME = process.env.MAIL_USERNAME || "mailbuzz62@gmail.com";
const MAIL_PASSWORD = process.env.MAIL_PASSWORD || "@Buzzmail1";
const MAIL_CLIENT_ID = process.env.MAIL_CLIENT_ID;
const MAIL_CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
const MAIL_REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;
module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  COOKIE_KEY,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  MAIL_CLIENT_ID,
  MAIL_CLIENT_SECRET,
  MAIL_REFRESH_TOKEN,
};
