const express = require("express");
const {
  Users,
  Complain,
  ComplainAgainst,
  ComplainReviewer,
  Evidence,
} = require("../models");
const router = express.Router();
const path = require("path");
const uuid = require("uuid");

router.get("/users", async (req, res) => {
  const result = await Users.findAll({
    attributes: ["fullName", "userUNID"],
  });
  return res.json({
    data: result,
    error: "",
  });
});

router.post("/lodge-complaint", async (req, res) => {
  const complainUNID = uuid.v4();
  await Complain.create({
    complainUNID: complainUNID,
    complainTitle: req.body.complainTitle,
    ComplainerUNID: req.body.complainerUNID,
  });
  for (let i = 0; i < req.body.complainAgainstUserUNID.length; i++) {
    await ComplainAgainst.create({
      ComplainUNID: complainUNID,
      ComplainAgainstUserUNID: req.body.complainAgainstUserUNID[i],
    });
  }
  // res.send()
  // for (let i = 0; i < req.body.evidence.length; i++){
  //     await Evidence.create({
  //         ComplainUNID: complainUNID,
  //         evidence:
  //     })
  // }
  await ComplainReviewer.create({
    ComplainUNID: complainUNID,
    ComplainReviewerUserUNID: req.body.complainReviewerUserUNID,
  });
  res.json("Successful!!YAAAAY");
});

router.post("/hudaai", async (req, res) => {
  // console.log(req.files.file[0]);
  //   let sampleFile = req.files.file;
  //   res.send(sampleFile.length);
  if (!req.files) {
    return res.send("No files were uploaded.");
  }
//   let uploadPath;
//   const file = req.files.file;
//   uploadPath = path.join(__dirname, "..");
//   uploadPath +=
//     "/uploads/Evidence/" + file.filename + "." + file.name.split(".").pop();
//   file.mv(uploadPath, function (err) {
//     if (err) {
//       return res.json({
//         data: "",
//         error: "File Upload Error",
//       });
//     }
//   });
  res.send(req.files);
  console.log(req.files);
});

module.exports = router;
