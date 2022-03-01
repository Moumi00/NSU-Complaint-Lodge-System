const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const uuid = require("uuid");

function emailVerification(email, UNID) {
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
    subject: "Verify Email",
    text: "http://localhost:8000/verify-email/" + UNID,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

router.post("/register", async (req, res) => {
  const result = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (result === null) {
    res.json({
      data: "Registration Successfull",
      error: "",
    });
    const ID = uuid.v4();
    const password = await bcrypt.hash(req.body.password, saltRounds);
    await Users.create({
      UNID: ID,
      fullName: req.body.fullName,
      email: req.body.email,
      password: password,
      userType: req.body.userType,
    });
    emailVerification(req.body.email, ID);
  } else {
    res.json({
      data: "",
      error: "Email Already Registered",
    });
  }
});

router.get("/verify-email/:id", async (req, res) => {
  const result = await Users.findOne({
    where: {
      UNID: req.params.id,
    },
  });
  if (result) {
    await Users.update(
      {
        isVerified: true,
      },
      {
        where: {
          UNID: req.params.id,
        },
      }
    );
    res.json({
      data: "Email Verified",
      error: "",
    });
  }
});

module.exports = router;
