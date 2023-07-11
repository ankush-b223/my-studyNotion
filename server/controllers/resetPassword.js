const crypto = require("crypto");
const User = require("../models/users");
require("dotenv").config();
const bcrypt = require("bcrypt");

const mongoose = require("mongoose")

const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/passwordUpdated");

const resetPasswordToken = async(req,res)=>{


    try{

        const {email} = req.body;
        //user with email exists
        const user = await User.findOne({email:email});

    //validate user
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User with given email doesn't exist",
            })
        };

        //generate token
		const token = crypto.randomBytes(20).toString("hex");
        //push token to user fetched
        const updateToken = await User.findByIdAndUpdate(user._id , {
                token:token,
                //add expiration + 5mins from token genration
                resetPasswordExpires: Date.now() + 3600000,
            },

            {new:true}
        );
            //console.log("db call object",updateToken);
        //validation
        if(!updateToken){
            return res.status(500).json({
                success:false,
                message:"Soemthing went wrong in pushing token, try again",
            })
        };

        // user.token = token
        // user.resetPasswordExpires = Date.now() + 3600000;

        // await user.save()


        //constructing link to be sent in mail to user
        const link = `${process.env.REACT_BASE_URL}/resetPassword/${token}`;

        //send mail with link
        await mailSender(email,
            "Password Reset",
			`Your Link for password reset is ${link}. Please click this url to reset your password.`
        );

        //return res
        res.status(200).json({
            success:true,
            message:"Password Reset email sent!",
        });

        


    }catch(err){
        console.error("Err in resetPass token flow-> ",err);
		return res.status(500).json({
			success: false,
			message: `Token generation Failure, Please Try Again`,
		});
    }

};



const resetPassword = async(req,res)=>{


    try{
        
        //try sending token into params

        const {newPassword,token} = req.body;


        //fetch user from token ref
        const user = await User.findOne({token:token});

        //validation
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User doesn't exist , Malicious attempt",
            })
        };

        //check expiration of token
        if(user.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token Expired! , Regenerate Token",
            })
        };

        //hash new password
        const hashPassword = await bcrypt.hash(newPassword,10);

        //push it to db
        const updatePassword = await User.findByIdAndUpdate(user._id,{
            password:hashPassword,
            //expire token as its used already
            resetPasswordExpires:Date.now(),
        },{new:true});

        //validation
        if(!updatePassword){
            return res.status(500).json({
                success:false,
                message:"Soemthing went wrong in updating password, try again",
            })
        };

        //response
        res.status(200).json({
            success:true,
            message:"Password Reset successfull!",
        });




    }catch(err){
        console.error("Err in resetPass flow-> ",err);
		return res.status(500).json({
			success: false,
			message: `Reset Password Failure, Please Try Again`,
		});
    }

};




module.exports = {
    resetPassword,
    resetPasswordToken,
};