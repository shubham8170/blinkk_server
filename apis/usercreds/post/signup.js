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
        const existingUser = User.find(req.body.email);
        if (existingUser.length) {
            console.log(existingUser);
            return res.status(300).send({ msg: 'This email already register' })
        }
        const isvaliduser = await validateUser(req.body)
        if (isvaliduser) {
            req.body.otp = Math.floor(1000 + Math.random() * 9000);
            await sendOtpMail(req.body.email, req.body.otp );
            const user = User(req.body);
            let userObject=user.toObject();
            let saveUser = await user.save();
            delete userObject.otp;
            res.status(201).send(userObject);
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ msg: e });
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