const express = require("express");
const router = express();
const User = require('../../../database/schemas/userschema');
const Joi = require('joi');
const { verifyToken, createToken } = require('../../../middleware/jwt')
const validateUser = require('../../../middleware/uservalidation')
require('dotenv').config();
const sendOtpMail = require('../../../middleware/sendMail')

router.post('/signup', createToken, async (req, res) => {
    try {
        const existingUser = await User.find({ email: req.body.email });
        if (existingUser.length) {
            req.body.otp = Math.floor(1000 + Math.random() * 9000);
            await sendOtpMail(req.body.email, req.body.otp);
            const user = await User.findOneAndUpdate({ email: req.body.email }, { otp: req.body.otp });
            let userObject = user.toObject();
            delete userObject.otp;
            return res.status(200).send({ statue: true, user: userObject })
        }
        const isvaliduser = await validateUser(req.body)
        if (isvaliduser) {
            req.body.otp = Math.floor(1000 + Math.random() * 9000);
            await sendOtpMail(req.body.email, req.body.otp);
            const user = User(req.body);
            let userObject = user.toObject();
            let saveUser = await user.save();
            delete userObject.otp;
            res.status(201).send({ status: true, user: userObject });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ status: false, msg: e.message });
    }
});

router.post('/otp', verifyToken, async (req, res) => {
    try {
        const otp = req.body.otp;
        const user = await User.findOne({ email: req.user })
        if (user.otp === otp) {
            console.log(user);
            res.send(user)
        }
        else {
            throw new Error("OTP IS INCORRECT");
        }
    }
    catch (e) {
        res.status(400).send({
            msg: e.message
        })
    }


})

module.exports = router;