const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.post("/login", async (req, res) => {

  const check = await Users.findOne({
    where: { email: req.body.email, password: req.body.email },
  });

  if (check == null) {
    console.log("Not found!");
    return res.json({
      data: "",
      error: "Credentials don't match"
    });
  } else {
    if (check.isVerified) {
      if (check.active) {
        return res.json({
          data: "Successfully logged in!",
          error: ""
        });
      } else {
        return res.json({
          data: "",
          error: "Account not found. Please contact admin."
        });
      }
    } else {
      return res.json({
        data: "",
        error: "Please verify your email."
      });
    }
  }
});

module.exports = router;
