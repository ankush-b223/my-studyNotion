const express = require("express");
const router = express.Router();

//route middlewares
const {auth} = require("../middlewares/auth");

//fetching controllers

const {signup,
    login,
    changePassword,
    otp} = require("../controllers/authentication");

const { resetPassword,
    resetPasswordToken} = require("../controllers/resetPassword");



//routes

router.post("/sendOtp",otp);     //authentication routes
router.post("/signup" , signup);
router.post("/login",login);
router.post("/changePassword",auth,changePassword);


router.post("/reset-password-token",resetPasswordToken);       //reset password routes
router.post("/reset-password", resetPassword); //check this -> /:token ??






module.exports = router;