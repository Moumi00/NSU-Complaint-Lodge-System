const express = require("express");
const { Users } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const uuid = require("uuid");
const path = require("path");
const { GoogleVerification } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "992655217366-qiu0iegl7kmotoovl1630k6283o0jsuk.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);


router.post("/create-account", async (req, res) => {
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
      let actorType;
      if (
        !(
          req.body.userType == "Faculty" ||
          req.body.userType == "Admin" ||
          req.body.userType == "Student" ||
          req.body.userType == "RA / TA / Lab Instructor" ||
          req.body.userType == "Helper"
        )
      ) {
        return res.json({
          data: "",
          error: "Please select your designation",
        });
      }
  
      if (req.body.userType == "Faculty" || req.body.userType == "Admin") {
        actorType = Users.getAttributes().actorType.values[0];
      } else {
        actorType = Users.getAttributes().actorType.values[1];
      }
  
      let uploadPath;
      const file = req.files.file;
      uploadPath = path.join(__dirname, "..");
      uploadPath +=
        "/uploads/NSU IDs/" + req.body.nsuId + "." + file.name.split(".").pop();
      file.mv(uploadPath, function (err) {
        if (err) {
          return res.json({
            data: "",
            error: "File Upload Error",
          });
        }
      });
      const UNID = uuid.v4();
      const password = await bcrypt.hash(req.body.password, saltRounds);
      await Users.create({
        userUNID: UNID,
        fullName: req.body.fullName,
        nsuId: req.body.nsuId,
        uniqueDetail: req.body.fullName + " [" + req.body.nsuId + "]",
        email: req.body.email,
        actorType: actorType,
        accountType: Users.getAttributes().accountType.values[1],
        isVerified: 1,
        password: password,
        userType: req.body.userType,
        nsuIdPhoto: req.body.nsuId + "." + file.name.split(".").pop(), //Just the name of the file which is there in our backend server
      });
      
    } else {
      res.json({ 
        data: "",
        error: "Email Already Registered",
      });
    }
  });

module.exports = router;
  