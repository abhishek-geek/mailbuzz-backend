const usersRouter = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
require("express-async-errors");

usersRouter.get("/", async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
});

usersRouter.post("/", async (req, res) => {
  const body = req.body;

  if (body.password.length < 3) {
    res.status(400).json({ error: "password too short" });
  }
  // creating password hash

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const newUser = new User({
    username: body.username,
    name: body.name,
    email: body.email,
    passwordHash,
  });

  const savedUser = await newUser.save();

  res.status(201).json(savedUser);
});

module.exports = usersRouter;
