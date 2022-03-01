const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const nodemailer = require("nodemailer");

function emailVerification(newUser) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rentkorbo@gmail.com",
      pass: "saq@1234",
    },
  });

  var mailOptions = {
    from: "rentkorbo@gmail.com",
    to: newUser.email,
    subject: "Verify Email",
    text: "http://localhost:8000/verifyEmail/" + newUser.UNID,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

router.get('/register', async(req, res) => {
    
})
