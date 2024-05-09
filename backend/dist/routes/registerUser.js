const express = require('express');
const mongoose = require("mongoose");
const orgUser = require('../models/User');
const router = express.Router();
router.post('/register', async (req, res) => {
    const { f, l, org, email, dob, doj } = req.body;
    try {
        const user = orgUser.create({
            firstName: f,
            lastName: l,
            email: email,
            organization: org,
            dob: dob,
            doj: doj
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
});
module.exports = router;
export {};
//# sourceMappingURL=registerUser.js.map