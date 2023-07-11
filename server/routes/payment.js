const express = require("express");
const router = express.Router();

//route middlewares
const {auth,isStudent} = require("../middlewares/auth");

//fetching controllers
const {capturePayment,
    verifySignature,
    sendPaymentConfirmation} =require("../controllers/razorpay");



//routes
router.post("/capturePayment",auth, isStudent, capturePayment);
router.post("/verifySignature" , auth,isStudent, verifySignature); //auth req? -> no harm
router.post("/sendConfirmationEmail", auth,isStudent,sendPaymentConfirmation);




module.exports = router;