const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'test_test_6767@mail.ru',
    pass: 'fLRVRnGpZArszvakhMQU'
  },
}
);

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err);
        console.log('Email sent', info);
    })
}

module.exports = mailer;