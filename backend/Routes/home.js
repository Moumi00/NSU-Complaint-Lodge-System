const express = require("express");
const { Users } = require("../models");
const router = express.Router();

router.get('/users', async (req, res) => {
    const result = await Users.findAll({
        attributes: ['fullName']
    });
    return res.json({
        data: result,
        error: ""
    });
})

module.exports = router;