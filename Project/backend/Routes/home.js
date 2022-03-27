const express = require("express");
const { Users, Complain, ComplainAgainst, ComplainReviewer} = require("../models");
const router = express.Router();
const uuid = require('uuid');

router.get('/users', async (req, res) => {
    const result = await Users.findAll({
        attributes: ['fullName', 'userUNID']
    });
    return res.json({
        data: result,
        error: ""
    });
})

router.post('/lodge-complaint', async (req, res) => {
    const complainUNID = uuid.v4();
    await Complain.create({
        complainUNID: complainUNID,
        complainTitle: req.body.complainTitle,
        ComplainerUNID: req.body.complainerUNID
    });
    for(let i = 0; i < req.body.complainAgainstUserUNID.length; i++){
        await ComplainAgainst.create({
            ComplainUNID: complainUNID,
            ComplainAgainstUserUNID: req.body.complainAgainstUserUNID[i]
        });
    }
    await ComplainReviewer.create({
        ComplainUNID: complainUNID,
        ComplainReviewerUserUNID: req.body.complainReviewerUserUNID
    });
    res.json("Successful!!YAAAAY");
});
module.exports = router;