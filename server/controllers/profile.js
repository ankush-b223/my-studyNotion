const User = require("../models/users");
const Profile = require("../models/profiles");
const Course = require("../models/courses");

const schedule = require("node-schedule");

const {uploadImageToCloudinary} = require("../utils/cloudinaryUploader");




const updateProfile = async(req,res)=>{

    try{

        //to initialize destructured fields -> state here const {gender="",dob=""} req.body;

        const {gender,dateOfBirth,about,contactNumber} = req.body;

        const {id} = req.user;

        const user = await User.findById(id);

        const profile = await Profile.findById(user.additionalDetails);

        //check if field is there in req , then update
        if(gender !== undefined){
            profile.gender = gender
        };

        if(dateOfBirth !== undefined){
            profile.dateOfBirth = dateOfBirth
        };

        if(about !== undefined){
            profile.about = about
        };

        if(contactNumber !== undefined){
            profile.contactNumber = contactNumber
        };



        //if contact number already exists update rest of available fields
        // if(profile.contactNumber !== null){

        //     profile.gender = gender;
        //     profile.dateOfBirth = dateOfBirth;
        //     profile.about = about;

        // }else{//contact number doesn't already exists put in contact value

        //     profile.gender = gender;
        //     profile.dateOfBirth = dateOfBirth;
        //     profile.about = about;
        //     profile.contactNumber = contactNumber;

        // };

        await profile.save();

        const updatedUser = await User.findById(id)
            .populate("additionalDetails").exec();

        updatedUser.password = null;    

        res.status(200).json({
            success:true,
            data:updatedUser,
            message:"Profile Details updated successfully",
        });


    }catch(err){
        console.log("Err in updateProfile -> ", err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in updating profile , Try again!",
        })
    }
};


const deleteAccount = async(req,res)=>{

    try{

        const {id} = req.user;

        const user = await User.findById(id);

        //scheduling deletion job
        const scheduledTime = new Date(Date.now() + 1 * 1 * 3 * 60 * 1000);
        const deletionJob = schedule.scheduleJob(scheduledTime, async ()=>{

            //delete corresponding profile to user
            const deleteProfile = await Profile.findByIdAndDelete(user.additionalDetails);

            //deleting user courseLinks from courses
            const userCourses = user.courses;
            //go to each course and delete user from studentsEnrolled 
            for(const singleCourseId of userCourses ){
                //fetch current iteration course
                const course = await Course.findById(singleCourseId);
                //if the course exists
                if(course){
                    const deleteUserFromCourse = await Course.findByIdAndUpdate(course._id , {
                            $pull: {
                                studentsEnrolled: id,
                            },
                        },
                        {new:true}
                    );
                };
            };

            //delete user
            const deleteUser = await User.findByIdAndDelete(id);
            console.log(`User deleted with all links removed :)`);

        });

        //validate deletionJob******************

        res.status(200).json({
            success:"scheduled",
            data:deletionJob.name,
            message:`Deletion Job has been scheduled successfully on-> ${deletionJob.nextInvocation()}`,
        })




    }catch(err){
        console.log("Err in deleteAccount   -> ", err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in deleting Account , Try again!",
        })
    }
};


const getAllUserDetails = async(req,res)=>{

    try{

        const {id} = req.user;

        const user = await User.findById(id).populate("additionalDetails").exec();

        if(!user){

            return res.status(400).json({
                success:false,
                message:"User not found",
            })
        };
        user.password =null; //or construct a customized data object to send in res 

        res.status(200).json({
            success:true,
            data:user,
            message:"User Details fetched",
        })


    }catch(err){
        console.log("Err in  getAllUserDetails  -> ", err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in getAllUserDetails , Try again!",
        })
    }
};


const updateDisplayPicture = async(req,res)=>{


    try{

        const {id} = req.user;

        const {imageFile} = req.files;

        //validate image file
        if(!imageFile){
            return res.status(400).json({
                success:false,
                message:"Image not found",
            })
        };

        //upload to cloudinary
        const uploadCloud = await uploadImageToCloudinary(imageFile,process.env.CLOUDINARY_FOLDER);

        //update user image link
        const updateUser = await User.findByIdAndUpdate(id,{
            image:uploadCloud.secure_url,
        },{new:true}).populate("additionalDetails").exec();

        //validation
        if(!updateUser){
            return res.status(400).json({
                success:false,
                message:"Update failed, try again!",
            })
        };

        //response
        res.status(200).json({
            success:true,
            data:updateUser,
            message:"User Image uploaded",
        });


    }catch(err){
        console.log("Err in updateDisplayPicture   -> ", err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in updateDisplayPicture , Try again!",
        })
    }
};


const getEnrolledCourses = async(req,res)=>{

    try{

        
        const {id} = req.user;

        const user = await User.findById(id).populate({
            path: "courses",
            populate: {
              path: "courseContent",
              populate: {
                path: "subSection",
              },
            },
          }).exec();

        //validate
        if(!user){

            return res.status(400).json({
                success:false,
                message:"User not found",
            })
        };
        //if no courses exist -> customise response
        //response
        user.password = null;

        //try sending response only the courses
        res.status(200).json({
            success:true,
            data:user.courses,
            message:"User Details fetched",
        })


    }catch(err){
        console.log("Err in  getEnrolledCourses  -> ", err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in getEnrolledCourses , Try again!",
        })
    }
};






module.exports = {
    updateProfile,
    updateDisplayPicture,
    getAllUserDetails,
    getEnrolledCourses,
    deleteAccount,
}