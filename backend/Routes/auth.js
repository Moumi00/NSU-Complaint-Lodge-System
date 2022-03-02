const { Router } = require("express");
const express = require("express");
const { Users } = require("../models");
const router = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const uuid = require("uuid");
const { UserVerification } = require("../models");
const Sequelize = require("sequelize");

function emailVerification(email, verificationToken) {
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
    text: "http://localhost:8000/auth/verify-email/" + verificationToken,
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
    const UNID = uuid.v4();
    const password = await bcrypt.hash(req.body.password, saltRounds);
    await Users.create({
      UNID: UNID,
      fullName: req.body.fullName,
      nsuId: req.body.nsuId,
      email: req.body.email,
      password: password,
      userType: req.body.userType,
    });
    const verificationToken = uuid.v4();
    await UserVerification.create({
      verificationToken: verificationToken,
      expiryDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      UserUNID: UNID,
    });
    emailVerification(req.body.email, verificationToken);
  } else {
    res.json({
      data: "",
      error: "Email Already Registered",
    });
  }
});

router.get("/verify-email/:verificationToken", async (req, res) => {
  const result = await UserVerification.findOne({
    where: {
      verificationToken: req.params.verificationToken,
    },
  });
  if (result) {
    if (result.expiryDate > new Date()) {
      await Users.update(
        {
          isVerified: true,
        },
        {
          where: {
            UNID: result.UserUNID,
          },
        }
      );
      await UserVerification.update(
        {
          isVerified: true,
        },
        {
          where: {
            verificationToken: req.params.verificationToken,
          },
        }
      );
      res.json({
        data: "Email Verified",
        error: "",
      });
    } else {
      res.json({
        data: "",
        error: "Verify Time passed",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  const check = await Users.findOne({
    where: { email: req.body.email },
  });

  if (check === null) {
    console.log("Not found!");
    return res.json({
      data: "",
      error: "Credentials don't match",
    });
  } else {
    if (await bcrypt.compare(req.body.password, check.password)) {
      if (check.isVerified) {
        if (check.active) {
          return res.json({
            data: "Successfully logged in!",
            error: "",
          });
        } else {
          return res.json({
            data: "",
            error: "Account not found. Please contact admin.",
          });
        }
      } else {
        return res.json({
          data: "",
          error: "Please verify your email.",
        });
      }
    } else {
      return res.json({
        data: "",
        error: "Credentials don't match",
      });
    }
  }
});

module.exports = router;
