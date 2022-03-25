const express = require("express");
const { Users } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const uuid = require("uuid");
const { UserVerification } = require("../models");
const { mailSender } = require("../utilities/utilities");
const path = require("path");
const { GoogleVerified } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "992655217366-qiu0iegl7kmotoovl1630k6283o0jsuk.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

router.get("/all", async (req, res) => {
  const result = await UserVerification.findAll({
    include: Users,
  });
  res.json(result);
});

router.get("/hudaai", async (req, res) => {
  res.json(Users.getAttributes().actorType.values[1]);
});

router.post("/login/google", async (req, res) => {
  let googleID;
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.body.googleID,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    googleID = payload.sub;
  }
  verify()
    .then(async () => {
      const result = await GoogleVerified.findOne({
        where: {
          googleID: googleID,
        },
      });
      if (result) {
        return res.json({
          data: result,
          error: "",
        });
      } else {
        return res.json({
          data: "",
          error: "Account Not Registered using Google Signup",
        });
      }
    })
    .catch(console.error);
});

router.post("/register/google", async (req, res) => {
  try {
    
    let googleID;
    const ticket = await client.verifyIdToken({
      idToken: req.body.googleID,
      audience: CLIENT_ID,
    });
    payload = ticket.getPayload();
    googleID = payload.sub;
    const result = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (result === null) {
      let actorType;
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
      console.log("Upload path:" + uploadPath);
      file.mv(uploadPath, function (err) {
        if (err) {
          return res.json({
            data: "",
            error: "File Upload Error",
          });
        }
      });
      const UNID = uuid.v4();
      const user = await Users.create({
        userUNID: UNID,
        fullName: req.body.fullName,
        nsuId: req.body.nsuId,
        email: req.body.email,
        actorType: actorType,
        userType: req.body.userType,
        isVerified: true,
        nsuIdPhoto: req.body.nsuId + "." + file.name.split(".").pop(),
      });
      res.json({
        data: user,
        error: "",
      });
      await GoogleVerified.create({
        googleID: googleID,
        UserUNID: UNID,
      });
    } else {
      res.json({
        data: "",
        error: "Email Already Registered",
      });
    }
  } catch (error) {
    res.json({ 
      data: "",
      error: error,
    }) 
  }
});

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
    let actorType;

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
    console.log("Upload path:" + uploadPath);
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
      email: req.body.email,
      actorType: actorType,
      password: password, 
      userType: req.body.userType,
      nsuIdPhoto: req.body.nsuId + "." + file.name.split(".").pop(), //Just the name of the file which is there in our backend server
    });
    const verificationToken = uuid.v4();
    await UserVerification.create({
      verificationToken: verificationToken,
      expiryDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), //24 hours valid to verify email
      UserUNID: UNID,
    });

    let subject = "Verify Email";
    let text =
      "Please visit the following link to verify your email:\n" +
      "http://localhost:8000/auth/verify-email/" +
      verificationToken;
    mailSender(req.body.email, subject, text);
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
            userUNID: result.UserUNID,
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
  const result = await Users.findOne({
    where: { email: req.body.email },
  });

  if (result === null) {
    return res.json({
      data: "",
      error: "Account Not Registered.",
    });
  } else {
    if (result.password == null) {
      return res.json({
        data: "",
        error: "Please login using google SignIn",
      });
    } else if (await bcrypt.compare(req.body.password, result.password)) {
      if (result.isVerified) {
        if (result.active) {
          //Can send user UNID only too
          return res.json({
            data: result,
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

router.post("/forget-password", async (req, res) => {
  const result = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (result == null) {
    return res.json({
      data: "",
      error: "Account not found!",
    });
  } else {
    if (result.password == null) {
      return res.json({
        data: "",
        error: "Please login using google SignIn",
      });
    } else if (result.isVerified) {
      let subject = "Account recovery";
      let text =
        "Please visit the following link:\n" +
        "http://localhost:3000/reset-password/" +
        result.userUNID;
      mailSender(result.email, subject, text);
      return res.json({
        data: "Please check your email to recover your account.",
        error: "",
      });
    } else {
      return res.json({
        data: "",
        error: "Email not verified. Please verify first.",
      });
    }
  }
});

router.post("/verify-unid", async (req, res) => {
  const result = await Users.findOne({
    where: {
      userUNID: req.body.UNID,
    },
  });
  if (result == null || result.password == null) {
    return res.json({
      data: "",
      error: "Access denied.",
    });
  }
  // } else {
  //   return res.json({
  //     data: "Accessible",
  //     error: "",
  //   });
});

router.post("/password-update", async (req, res) => {
  const result = await Users.findOne({
    where: {
      userUNID: req.body.UNID,
    },
  });

  //Wont usually Happen because unid is always found in reset password
  if (result == null) {
    return res.json({
      data: "",
      error: "Unknown Error. Contact Admin.",
    });
  } else {
    const password = await bcrypt.hash(req.body.password, saltRounds);
    await Users.update(
      {
        password: password,
      },
      {
        where: {
          userUNID: req.body.UNID,
        },
      }
    );

    return res.json({
      data: "Password Successfully Updated",
      error: "",
    });
  }
});

module.exports = router;

//TODO:
//1. Unique Token for password change
//2. Expiry time for password change
//3. Check primarity of NSU ID
//4. Eye of passwords dissappear        {DONE}
//5. After succesfull register redirect to homepage
//6. Same for login
//7. Add videos to file type
//8. Add ID image while registering   {DONE}
//9. Add ID image to search bar
//10. Options after typing in search bar  {DONE}
//11. Send UNID along with fullname to lodge complain
//12. What all can be updated in lodge complain
