const Otp = require("../models/otp");
const User = require("../models/users");
const Profile = require("../models/profiles");

const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/passwordUpdated");

const otpGenerator = require("otp-generator");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

require("dotenv").config();




//send otp
const otp = async(req,res)=>{
    try{

        const {email} = req.body;

        const user = await User.findOne({email:email});

        //validation to check if user already exists
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists, LogIn!",
            })
        };

        //generate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        //validate if otp created is already there in db
        //const result = await Otp.findOne({otp:otp});

        //a check for generating unique otps //bad practice but unique otp generator package not available

        //if already in db regenerate otp 
        // while(result){
        //     otp = otpGenerator.generate(6,{
        //         upperCaseAlphabets:false,
        //         lowerCaseAlphabets:false,
        //         specialChars:false,
        //     });

        //     result = await Otp.findOne({otp:otp});
        // };

        //push new otp object to db which will trigger pre hook on db to send the mail 
        const pushOtp = await Otp.create({
            otp:otp,
            email:email,
        });
        
        if(pushOtp){
            console.log("otp pushed @-> " , Date.now());
        }
        //return res
        res.status(200).json({
            success:true,
            message:"Otp sent successfully",
        });


    }catch(err){
        console.log("Error in otp generation flow , -> ", err);
        return res.status(500).json({
            success:false,
            data:err.message,
            message:"Something went wrong :) , try again!",
        })
        
    }
};


//signup
const signup = async(req,res)=>{

    if(req.body?.iss === "https://accounts.google.com"){
        //google sign up flow
        try{

            const{ 
                firstName , lastName , email , contactNumber, image
            } = req.body;

            const accountType = "Student";

            if(!firstName || !lastName || !email || !image) {
                    return res.status(403).json({
                        success:false,
                        message:"All fields are required",
                    })
            };


            const user = await User.findOne({email:email});

            //validation to check if user already exists
            if(user){
                return res.status(400).json({
                    success:false,
                    message:"User already exists, LogIn!",
                })
            };

            //null passwords for google sign up users
            const hashedPassword = null;
            
            let profileDetails = null;
            if(contactNumber){

                profileDetails = await Profile.create({
                    gender:null,
                    dateOfBirth: null,
                    about:null,
                    contactNumber:contactNumber,
                });

            }else{

                profileDetails = await Profile.create({
                    gender:null,
                    dateOfBirth: null,
                    about:null,
                    contactNumber:null,
                });

            };

            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password:hashedPassword,
                accountType,
                additionalDetails:profileDetails._id,
                //The image from google
                image:image,
            });


            res.status(200).json({
                success:true,
                message:"User is registered!",
            });



        }catch(err){

            console.log("Err in signup flow-> ",err);
            return res.status(500).json({
                success:false,
                message:"User wasn't registrered. Please try again",
            })
    
        }

    }
    else{

        //normal signup flow

        try{

            const{ 
                firstName , lastName , email , password , confirmPassword , contactNumber,accountType, otp
            } = req.body;

            if(!firstName || !lastName || !email || !password || !confirmPassword
                || !otp) {
                    return res.status(403).json({
                        success:false,
                        message:"All fields are required",
                    })
            };


            if(password !== confirmPassword) {
                return res.status(400).json({
                    success:false,
                    message:'Password and ConfirmPassword Value does not match, please try again',
                })
            };


            const user = await User.findOne({email:email});

            //validation to check if user already exists
            if(user){
                return res.status(400).json({
                    success:false,
                    message:"User already exists, LogIn!",
                })
            };

            const recentOtp = await Otp.find({email:email}).sort({createdAt:-1}).limit(1);
            //const recentOtp = await Otp.find({email:email});

            if (recentOtp.length === 0) {
                // OTP not found for the email
                return res.status(400).json({
                    success: false,
                    message: "The OTP is not valid",
                });
            }

            if(otp !== recentOtp[0].otp){
                return res.status(400).json({
                    success:false,
                    message:"invalid OTP",
                })
            };

            //implement password validations like Capital , small , special chr inclusion
            //otp matches

            const hashedPassword = await bcyrpt.hash(password,10);
            
            let profileDetails = null;
            if(contactNumber){

                profileDetails = await Profile.create({
                    gender:null,
                    dateOfBirth: null,
                    about:null,
                    contactNumber:contactNumber,
                });

            }else{

                profileDetails = await Profile.create({
                    gender:null,
                    dateOfBirth: null,
                    about:null,
                    contactNumber:null,
                });

            };

            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password:hashedPassword,
                accountType,
                additionalDetails:profileDetails._id,
                //The default image with initials as def DP
                image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}+${lastName}`,
            });


            res.status(200).json({
                success:true,
                message:"User is registered!",
            });



        }catch(err){

            console.log("Err in signup flow-> ",err);
            return res.status(500).json({
                success:false,
                message:"User wasn't registrered. Please try again",
            })

        }

    }
}

//login
const login = async(req,res)=>{

    if(req.body.access_token){
        //google log in
        try{
            const {access_token} = req.body

            //console.log("access token in google login-> ", access_token);
    
            if(!access_token){
                return res.status(400).json({
                    success:false,
                    message:"Missing google access token",
                })
            };

            //use google auth token to fetch user email->
            const googleResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })
            
            //console.log("Google user info response->",googleResponse.data);

            const googleData = googleResponse.data;

            let loginCred = {}

            //login object creation for db check->{}
            if(googleResponse?.data?.email_verified){
                loginCred = {
                    email:googleData.email,
                    firstName:googleData.given_name,
                    lastName:googleData.family_name,
                }
    
            }else{
                return res.status(200).json({
                    success:false,
                    message:"Credentials not verified by google, Try again!",
                })
            }
            

            //email validation
            const user = await User.findOne({
                email:loginCred.email,
                firstName:loginCred.firstName,
                lastName:loginCred.lastName,
             }).populate("additionalDetails").exec();
    
            if(!user){
                return res.status(400).json({
                    success:false,
                    message:"User wasn't found,\n change credentials or Try signing Up!",
                })
            };
    
    
            //correct password
    
            const payload = {
                email:user.email,
                id:user._id,
                role:user.accountType,
            };
    
            const token  = jwt.sign(payload,process.env.JWT_SECRET , {
                expiresIn:"24h",
            })
    
    
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            user.password =null; //or construct a customized data object to send in res 
            res.cookie("token", token , options).status(200).json({
                success: true,
                token:token,
                data:user,
                message: `User Login Success`,
            });
    
    
    
    
    
    
    
        }catch(err){
    
            console.error("Err in google login flow-> ",err);
            return res.status(500).json({
                success: false,
                message: `Google Login Failure Please Try Again`,
            });
            
        }

    }else{
        //normal log in flow
        try{
            const {email,password} = req.body
    
            if(!email || !password){
                return res.status(400).json({
                    success:false,
                    message:"Missing fields",
                })
            };
    
            //email validation
    
            const user = await User.findOne({email:email}).populate("additionalDetails").exec();
    
            if(!user){
                return res.status(400).json({
                    success:false,
                    message:"User wasn't found",
                })
            };
    
            const checkPassword = await bcyrpt.compare(password,user.password);
    
            if(!checkPassword){
                //incorrect password flow
                return res.status(400).json({
                    success:false,
                    message:"Invalid Credentials",
                })
            };
    
            //correct password
    
            const payload = {
                email:user.email,
                id:user._id,
                role:user.accountType,
            };
    
            const token  = jwt.sign(payload,process.env.JWT_SECRET , {
                expiresIn:"24h",
            })
    
    
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            user.password =null; //or construct a customized data object to send in res 
            res.cookie("token", token , options).status(200).json({
                success: true,
                token:token,
                data:user,
                message: `User Login Success`,
            });
    
    
    
    
    
    
    
        }catch(err){
    
            console.error("Err in login flow-> ",err);
            return res.status(500).json({
                success: false,
                message: `Login Failure Please Try Again`,
            });
            
        }
    }

    
}

// change password
const changePassword = async(req,res)=>{
    try{

        const {id} = req.user;

        const {oldPassword , newPassword , confirmNewPassword} = req.body;

        const user = await User.findById(id);

        if(oldPassword !== user.password){
            return res.status(400).json({
                success:false,
                message:"Existing Password doesn't match",
            })
        };

        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords don't match",
            });
        };

        const hashedPassword = await bcyrpt.hash(newPassword , 10);
        const updatedUser = await User.findByIdAndUpdate(id,{
            password:hashedPassword,
            }, 
            {new:true}
        );

        //send mail*********\
        try {

			const emailResponse = await mailSender(
				updatedUser.email,//email address of user
				passwordUpdated(
					updatedUser.email,
					`Password updated successfully for ${updatedUser.firstName} ${updatedUser.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);

		}catch(err) {

			console.error("Error occurred while sending email for password update flow:", err);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
			});
		};
        

        //res
        res.status(400).json({
            success:true,
            message:"Password changed successfully",
        });

    }catch(err){
        console.error("Err in login flow-> ",err);
		return res.status(500).json({
			success: false,
			message: `Something went wrong!`,
		});
        
    }
};


module.exports = {
    signup,
    login,
    changePassword,
    otp,
};