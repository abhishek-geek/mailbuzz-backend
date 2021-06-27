const { default: axios } = require("axios");
const app = require("./app");
const { PORT } = require("./utils/config");
const nodemailer = require("./utils/nodemailer");

const sendMails = async (time) => {
  setInterval(async () => {
    try {
      const res = await axios.get("http://localhost:3003/mails/future/send");
      const mails = res.data;
      console.log("mails to send: ", mails);
      await nodemailer.send(mails);
      console.log("mails sent");
      console.log("creating new mails arr");
      const newMails = mails.map((mail) => {
        const schedule = mail.schedule;
        let currentDate = new Date(Date.parse(mail.nextDate));
        let prevDate = mail.nextDate;
        let nextDate;
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
            nextDate = new Date(
              currentDate.setDate(currentDate.getDate() + 30)
            );
            break;
          case "yearly":
            nextDate = new Date(
              currentDate.setDate(currentDate.getDate() + 365)
            );
            break;
        }
        const mailObj = {
          ...mail,
          nextDate,
          prevDate,
        };
        return mailObj;
      });
      await axios.put("http://localhost:3003/mails/all", { newMails });
    } catch (e) {
      console.error(e.message);
    }
  }, time * 1000);
};

sendMails(3);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`connecting to port ${PORT}...`);
});
