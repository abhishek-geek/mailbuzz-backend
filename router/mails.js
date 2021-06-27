const mailsRouter = require("express").Router();
const Mail = require("../model/mail");
require("express-async-errors");

mailsRouter.get("/", async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(400).json({ error: "Login first!" });
  }
  const from = req.user.email;
  const allMails = await Mail.find({ from });
  res.status(200).json(allMails);
});

mailsRouter.get("/future", async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(400).json({ error: "Login first!" });
  }
  const allMails = await Mail.find({ from: user.email });
  const currDate = new Date();
  const filteredMails = allMails.filter((mail) => mail.nextDate > currDate);
  res.status(200).json(filteredMails);
});

mailsRouter.get("/future/send", async (req, res) => {
  console.log("gett");
  const allMails = await Mail.find();
  // console.log("all: ", allMails);

  const currDate = new Date();
  const filteredMails = allMails.filter((mail) => {
    return (
      mail.nextDate.getTime() >= currDate.getTime() - 5000 &&
      mail.nextDate.getTime() <= currDate.getTime() + 5000
    );
  });
  console.log("filll: ", filteredMails);
  res.status(200).json(filteredMails);
});

mailsRouter.put("/all", async (req, res) => {
  console.log("Putting All....");

  const newMails = req.body.newMails;

  console.log("To be updated: ", newMails);

  const promiseArray = newMails.map((mail) =>
    Mail.findByIdAndUpdate(mail.id, mail, {
      new: true,
    })
  );

  console.log("promiseArr", promiseArray);

  const saved = await Promise.all(promiseArray);
  console.log("saved", saved);
  res.status(201);
});

mailsRouter.put("/future/:id", async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(400).json({ error: "Login first!" });
  }
  const id = req.params.id;
  const body = req.body;

  const mail = await Mail.findById(id);
  console.log("mail: ", mail);
  console.log("body: ", body);

  const schedule = body.schedule;
  let currentDate = new Date();
  let nextDate;
  console.log(schedule);
  switch (schedule) {
    case "recurring":
      nextDate = new Date(
        currentDate.setSeconds(currentDate.getSeconds() + 10)
      );
      break;
    case "daily":
      nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      break;
    case "weekly":
      nextDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
      break;
    case "monthly":
      nextDate = new Date(currentDate.setDate(currentDate.getDate() + 30));
      break;
    case "yearly":
      nextDate = new Date(currentDate.setDate(currentDate.getDate() + 365));
      break;
  }

  const newMail = {
    ...body,
    nextDate,
    prevDate: nextDate,
  };
  const updatedMail = await Mail.findByIdAndUpdate(id, newMail, {
    new: true,
  });
  res.status(201).json(updatedMail);
});

mailsRouter.get("/past", async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(400).json({ error: "Login first!" });
  }
  const allMails = await Mail.find({ from: user.email });
  const currDate = new Date();
  const filteredMails = allMails.filter((mail) => mail.nextDate < currDate);
  res.status(200).json(filteredMails);
});

mailsRouter.post("/", async (req, res) => {
  const body = req.body;
  const user = req.user;
  if (!user) {
    res.status(400).json({ error: "Login first!" });
  }
  const from = user.email;
  const schedule = body.schedule;

  const currentDate = new Date();
  let nextDate;
  console.log(schedule);
  switch (schedule) {
    case "recurring":
      console.log(currentDate.getTime());

      nextDate = new Date(
        currentDate.setSeconds(currentDate.getSeconds() + 10)
      );
      console.log(nextDate.getTime());

      break;
    case "daily":
      console.log(currentDate.getTime());
      nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      console.log(nextDate.getTime());
      console.log(currentDate.getTime());
      console.log("rem: ", nextDate.getTime() - currentDate.getTime());
      break;
    case "weekly":
      nextDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
      break;
    case "monthly":
      nextDate = new Date(currentDate.setDate(currentDate.getDate() + 30));
      break;
    case "yearly":
      nextDate = new Date(currentDate.setDate(currentDate.getDate() + 365));
      break;
  }

  console.log(nextDate);

  const newMail = new Mail({
    ...body,
    from,
    nextDate,
    prevDate: nextDate,
  });

  const savedMail = await newMail.save();

  res.status(201).json(savedMail);
});

module.exports = mailsRouter;
