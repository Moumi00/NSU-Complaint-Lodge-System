const express = require("express");
const {
  Users,
  Complain,
  ComplainAgainst,
  ComplainReviewer,
  Evidence,
  ComplainDescription,
} = require("../models");
const router = express.Router();
const path = require("path");
const uuid = require("uuid");
const { Op, where } = require("sequelize");
const { Sequelize } = require("sequelize");

router.get("/user-details", async (req, res) => {
  const result = await Users.findOne({
    attributes: ["fullName", "email", "nsuId", "userType"],
    where: {
      userUNID: req.query.userUNID
    },
    include:[{
      model: Complain,
      attributes: ["complainUNID", "complainTitle", "status"]
    },{
      model: ComplainReviewer,
      attributes: ["complainUNID"],
      required: false,
      where: {
        currentReviewer: ComplainReviewer.getAttributes().currentReviewer.values[0]
      },
      include: [{
        model: Complain,
        attributes: ["complainTitle"],
        required: false,
        where: {
          status: "open"
        },
        include: [{
          model: Users,
          attributes: ["fullName", "userUNID"]
        }]
      }]
    }]
  });
  return res.json({
    data: result,
    error: "",
  });
});

router.post("/edit-complain", async (req, res) => {
  const temp = await Complain.findOne({
    attributes: ["edits"],
    where: {
      complainUNID: req.body.complainUNID,
    },
  });

  const editNumber = temp.dataValues.edits + 1;

  await Complain.update(
    {
      edits: editNumber,
    },
    {
      where: {
        complainUNID: req.body.complainUNID,
      },
    }
  );

  for (let i = 0; i < complainAgainstUserUNID.length; i++) {
    await ComplainAgainst.create({
      ComplainUNID: complainUNID,
      ComplainAgainstUserUNID: complainAgainstUserUNID[i],
      editHistory: editNumber,
    });
    console.log(complainAgainstUserUNID[i]);
  }

  // await ComplainReviewer.Update(
  //   {
  //     editHistory: editNumber,
  //   },
  //   {
  //     where: {
  //       ComplainUNID: req.body.complainUNID,
  //     },
  //   }
  // );

  await ComplainDescription.create({
    ComplainUNID: complainUNID,
    complainDescription: req.body.complainDescription,
    editHistory: editNumber
  });
});

router.get("/complain-latest-details", async (req, res) => {
  const temp = await Complain.findOne({
    attributes: ["edits"],
    where: {
      complainUNID: req.query.complainUNID,
    },
  });

  if (temp == null) {
    return res.json({
      data: "",
      error: "Invalid Complain UNID",
    });
  }

  const result = await Complain.findOne({
    include: [
      {
        model: ComplainAgainst,
        where: {
          editHistory: temp.dataValues.edits,
        },
        include: [
          {
            model: Users,
            attributes: ["fullName", "userUNID"],
          },
        ],
      },
      {
        model: ComplainDescription,
        attributes: ["complainDescription"],
        where: {
          editHistory: temp.dataValues.edits,
        },
      },
      {
        model: Evidence,
        attributes: ["evidence"],
        where: {
          editHistory: temp.dataValues.edits,
        },
      },
      {
        model: ComplainReviewer,
        where: {
          currentReviewer: "Yes",
        },
        include: [
          {
            model: Users,
            attributes: ["fullName", "userUNID"],
          },
        ],
      },
    ],
    where: {
      complainUNID: req.query.complainUNID,
      ComplainerUNID: req.query.ComplainerUNID,
    },
  });

  res.json({
    data: result,
    error: "",
  });
});

router.get("/reviewers", async (req, res) => {
  const result = await Users.findAll({
    attributes: ["fullName", "userUNID"],
    where: {
      [Op.and]: [
        {
          fullName: {
            [Op.substring]: req.query.query,
          },
        },
        {
          actorType: "Reviewer",
        },
        {
          userUNID: {
            [Op.notLike]: req.query.userUNID,
          },
        },
      ],
    },
    limit: 10,
  });
  return res.json({
    data: result,
    error: "",
  });
});

router.get("/complain-against", async (req, res) => {
  // console.log(req.query);
  const result = await Users.findAll({
    attributes: ["fullName", "userUNID"],
    where: {
      [Op.and]: [
        {
          fullName: {
            [Op.substring]: req.query.query,
          },
        },
        {
          userUNID: {
            [Op.notLike]: req.query.userUNID,
          },
        },
      ],
    },
    limit: 10,
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
      "/uploads/Evidence/" +
      complainUNID +
      "-" +
      idx +
      "." +
      image.name.split(".").pop();
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
    : move(files, 0);

  await ComplainReviewer.create({
    ComplainUNID: complainUNID,
    ComplainReviewerUserUNID: req.body.complainReviewerUserUNID,
    currentReviewer: ComplainReviewer.getAttributes().currentReviewer.values[0]
  });

  await ComplainDescription.create({
    ComplainUNID: complainUNID,
    complainDescription: req.body.complainDescription,
  });

  res.json({
    data: "Succesfully lodged a complaint",
    error: "",
  });
});

router.get("/reviewers", async (req, res) => {
  const result = await Users.findAll({
    where: {
      actorType: Users.getAttributes().actorType.values[0],
    },
    attributes: ["fullName", "userUNID"],
  });
  res.json({
    data: result,
    error: "",
  });
});

module.exports = router;
