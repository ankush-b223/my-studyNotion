const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({

    email:{
        type:String,
    },

    otp:{
        type:String,
    },

    createdAt:{
        type:Date,
        default: Date.now,
        expires:60*5,
    }



});

const sendOtpMail = async(email,otp)=>{
    try{

        const mailResponse = await mailSender(email,"OTP FROM STUDYNOTION" , otp);
        //handle errors
//        console.log("Email sent successfully" , mailResponse);
        console.log("Email sent successfully");

        
    }catch(err){
        console.log("Error in sending otp");
    }
}

otpSchema.pre("save", async function(next){

    if(this.isNew){
        await sendOtpMail(this.email , this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP" , otpSchema);