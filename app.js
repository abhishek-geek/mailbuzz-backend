const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGODB_URI, PORT, COOKIE_KEY } = require("./utils/config");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport-setup");
const usersRouter = require("./router/users");
const loginRouter = require("./router/login");

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

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY],
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(passport.initialize());
app.use(passport.session());

// Example protected and unprotected routes
app.get("/", (req, res) => res.send("Example Home page!"));
app.get("/failed", (req, res) => res.send("You Failed to log in!"));

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get("/good", isLoggedIn, (req, res) => {
  console.log("can send: ", req.user);
  // res.send(`Welcome Mr ${req.user.name}!`);
  res.status(200).send(req.user);
});

app.use("/users", usersRouter);
app.use("/login", loginRouter);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

module.exports = app;
