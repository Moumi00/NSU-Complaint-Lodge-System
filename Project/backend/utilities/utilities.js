const nodemailer = require("nodemailer");

function mailSender(email, subject, text) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rentkorbo@gmail.com",
        pass: "saq@1234",
      },
    });
  
    var mailOptions = {
      from: "rentkorbo@gmail.com",
      to: email,
      subject: subject,
      text: text
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
  
exports.mailSender = mailSender;