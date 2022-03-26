const express = require("express");
const { Users } = require("../models");
const router = express.Router();

router.get('/users', async (req, res) => {
    const result = await Users.findAll({
        attributes: ['fullName', 'userUNID']
    });
    return res.json({
        data: result,
        error: ""
    });
})

router.post('/lodge-complain', async (req, res) => {
    
});

module.exports = router;