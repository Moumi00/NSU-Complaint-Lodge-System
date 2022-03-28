const express = require("express");
const {
  Users,
  Complain,
  ComplainAgainst,
  ComplainReviewer,
  Evidence,
  ComplainDescription
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
  const complainAgainstUserUNID = JSON.parse(req.body.complainAgainstUserUNID);
//   return console.log(JSON.parse(req.body.complainAgainstUserUNID));
  await Complain.create({
    complainUNID: complainUNID,
    complainTitle: req.body.complainTitle,
    ComplainerUNID: req.body.complainerUNID, 
  });
  for (let i = 0; i < complainAgainstUserUNID.length; i++) {
    await ComplainAgainst.create({
      ComplainUNID: complainUNID,
      ComplainAgainstUserUNID: complainAgainstUserUNID[i],
    });
    console.log(complainAgainstUserUNID[i]);
  }
  const files = req.files.file;

  async function move(image, idx) {
    let uploadPath;
    uploadPath = path.join(__dirname, "..");
    uploadPath +=
      "/uploads/Evidence/" + complainUNID + "-" + idx + "." + image.name.split(".").pop();
    try {
      image.mv(uploadPath);
    } catch (e) {
      return res.send({
        success: false,
        message: "upload error",
      });
    }
    await Evidence.create({
      ComplainUNID: complainUNID,
      evidence: complainUNID + "-" + idx + "." + image.name.split(".").pop(),
    });
  }

  Array.isArray(files)
    ? files.forEach((file, idx) => move(file, idx))
    : move(files, idx);

  await ComplainReviewer.create({
    ComplainUNID: complainUNID,
    ComplainReviewerUserUNID: req.body.complainReviewerUserUNID,
  });

  await ComplainDescription.create({
    ComplainUNID: complainUNID,
    complainDescription: req.body.complainDescription,
  });
  
  res.json({
    data: "Succesfully lodged a complaint",
    error: ""
  });
});

module.exports = router;
