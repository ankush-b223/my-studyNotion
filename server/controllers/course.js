const Course = require("../models/courses");
const User = require("../models/users");
const Category = require("../models/category");
const CourseProgress = require("../models/courseProgress");

require("dotenv").config();

const {uploadImageToCloudinary} = require("../utils/cloudinaryUploader");
const sections = require("../models/sections");
const { convertSecondsToDuration } = require("../utils/durationCoverter");


const createCourse = async(req,res)=>{

    try{

        const {courseName,courseDescription,whatWillYouLearn,price,categoryId,instructions,tag} = req.body;
        let {status} = req.body;
        const {id} = req.user;
        const {thumbnail} = req.files;


        //validating input
        if (
			!courseName ||
			!courseDescription ||
			!whatWillYouLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!categoryId ||
            !instructions
		){
			return res.status(400).json({
				success: false,
				message: "Missing fields",
			});
		};

        //status
        if(!status || status === undefined ){
            status = "Draft"
        };


        //user is instructor
        const instructorCheck = await User.findById(id,{
            accountType:"Instructor"
        })

        if(!instructorCheck){
            return res.status(400).json({
                success:false,
                message:"User is not a instuctor",
            })        
        };

        //category check
        const categoryCheck = await Category.findById(categoryId);

        if(!categoryCheck){
            return res.status(400).json({
                success:false,
                message:"Invalid Category   ",
            })  
        }



        //upload thumbnail
        const uploadThumbnail  =await uploadImageToCloudinary(thumbnail,process.env.CLOUDINARY_IMAGE_FOLDER);

        const newCourse = await Course.create({
            courseName:courseName,
            courseDescription:courseDescription,
            price:price,
            status:status,
            thumbnail:uploadThumbnail.secure_url,
            tag:tag,
            category:categoryId,
            instructor:id,
            whatWillYouLearn:whatWillYouLearn,
            instructions:instructions,
        });

        //validate

        //linking course to instructor
        const linkUser = await User.findByIdAndUpdate(id,{
            $push:{
                courses:newCourse._id
            }
        });

        //linking new course to the category
        const linkCategory = await Category.findByIdAndUpdate(categoryId,{
            $push:{
                courses:newCourse._id
            }
        });

        //validate

        //response
        res.status(200).json({
            success:true,
            data:newCourse,
            message:"New Course created",
        });





    }catch(err){
        console.log("Err in createCourse -> ", err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong! , Try again",
        })
    }
};


const getAllCourses = async(req,res)=>{

    try{

        //query
        const result = await Course.find(
            {},//all course objects
            {
                courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
            }
        ).populate("instructor").exec();

        //response
        res.status(200).json({
            success:true,
            data:result,
            message:"All courses fetched",
        });



    }catch(err){
        console.log("Err in getAllCourses -> ", err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong! , Try again",
        })
    }
};



const getCourseDetails = async(req,res)=>{

    try{

        const {courseId} = req.body;

        //validation
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Missing fields",
            })
        }

        //query
        const course = await Course.findById(courseId)
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            }
        })
        .exec();

        //validation 
        if(!course){
            return res.status(400).json({
                success:false,
                message:"Course wasn't found",
            })
        }

        //response
        res.status(200).json({
            success:true,
            data:course,
            message:`fetched`,
        })



    }catch(err){
        console.log("Err in getCourseDetails -> ", err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong! , Try again",
        })
    }
};

//delete course

const editCourse = async(req,res)=>{

    try {

        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)
        
        if (!courseId || !updates) {
            console.log("courseId-> " , courseId);
            console.log("updates-> " , updates);

            return res.status(400).json({
              success:false,
              message: "Missing fields" })
        }

        if (!course) {
          return res.status(404004).json({
            success:false,
            message: "Course not found" })
        }
    
        // If Thumbnail Image is found, update it
        if (req.files) {
          console.log("thumbnail update")
          const thumbnail = req.files.thumbnailImage
          const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
          )
          course.thumbnail = thumbnailImage.secure_url
        }
    
        // Update only the fields that are present in the request body
        for (const key in updates) {
            //this is in additional check
          if (updates.hasOwnProperty(key)) {
            if (key === "tag" || key === "instructions") {
              course[key] = JSON.parse(updates[key])
            } else {
              course[key] = updates[key]
            }
          }
        }
    
        await course.save()
    
        const updatedCourse = await Course.findOne({
          _id: courseId,
        }).populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          }).exec()
          
    
        res.status(200).json({
          success: true,
          message: "Course updated successfully",
          data: updatedCourse,
        })

      }catch(error){
        console.error("Error in editing course flow-> ",error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
        })
      }


};

//get course progress

//update course progress

//get instuctor courses
const getInstructorCourses = async(req,res)=>{

    try{

        const {id} = req.user;

        const user = await User.findById(id).populate("courses").exec();

        const userCourses = user.courses;

        res.status(200).json({
            success:true,
            data:userCourses,
            message:"User Courses fetched",
        })

    }catch(err){
        console.log("Error in get instructor courses flow -> ", err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong, Try again!"
        })
    }


};


const deleteCourse = async(req,res)=>{

    try{

        const {courseId} = req.body;

        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Missing fields",
            })
        }

        const course = await Course.findById(courseId);

        
        //unlink courses with categories (pull)
        const unlinkCategory = await Category.findByIdAndRemove(course.category,{
            $pull:{
                courses:courseId
            }
        });

        //unlink from user.courses
        const unlinkUser = await User.findById(course.instructor,{
            $pull:{
                courses:courseId
            }
        })


        const deletingCourse = await Course.findByIdAndDelete(courseId);

        if(deletingCourse === null){
            return res.status(404).json({
                success:false,
                message:"Course wasn't found",
            })
        }

        res.status(200).json({
            success:true,
            message:"Course Deleted",
        })

    }catch(err){
        console.log("Err in deleting course ->  ", err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong, Please try again!",
        })
    }
};

const getFullCourseContent = async(req,res)=>{

    try{

        const {courseId} = req.body;
        const {id} = req.user;

        //validation
        if(!courseId ||!id){
            return res.status(400).json({
                success:false,
                message:"Missing Fields",
            })
        };

        //getting course requested details
        const theCourse = await Course.findById(courseId).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            }
        }).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).populate("category")
        .populate("ratingAndReviews")
        .exec();

        //validation
        if(!theCourse){
            return res.status(400).json({
                success:false,
                message:"Course not found",
            })
        }

        //getting user's course progress
        const userCourseProgress = await CourseProgress.findOne({
            courseID:courseId,
            userId:id
        });

        //validation
        if(!userCourseProgress){
            return res.status(400).json({
                success:false,
                message:"Course Progress for given combination parameters not found"
            })
        }

        //calculating total course Duration
        let totalCourseDurationSecs = 0;

        theCourse.courseContent.forEach((section)=>{
            section.subSection.forEach((subSection)=>{
                totalCourseDurationSecs += parseInt(subSection.timeDuration)
            })
        })
        //convertings total duration to desired format
        const totalDuration = convertSecondsToDuration(totalCourseDurationSecs)

        //ok response
        res.status(200).json({
            success:true,
            data:{
                theCourse,
                totalDuration,
                courseProgress: userCourseProgress.completedVideos ? 
                    userCourseProgress.completedVideos 
                    : 
                    [],
            }
        });


    }catch(err){
        console.log("Err in getting full course content->  " , err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong , Try again!",
        })
    }

};

const markSubSectionComplete = async(req,res)=>{

    try{

        const {subSectionId,courseId} = req.body;
        const {id} = req.user;

        //validation
        if(!subSectionId ||!id || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing Fields",
            })
        };

        const updateProgress = await CourseProgress.findOneAndUpdate({
            courseID:courseId,
            userId:id
        },{
            $push:{
                completedVideos:subSectionId
            }
        });

        if(!updateProgress){
            return res.status(400).json({
                success:false,
                message:"Course Progress wasn't found"
            })
        }

        res.status(200).json({
            success:true,
            message:"Course Progress is updated successfully",
        })

        


    }catch(err){
        console.log("Err in marking lecture complete->  " , err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong , Try again!",
        })
    }

};


const getInstructorDashboard = async(req,res)=>{

    try{

        const {id} = req.user;

        const instructorCourses = await Course.find({
            instructor:id
        });

        if(!instructorCourses){
            return res.status(400).json({
                success:false,
                message:"No courses found for instructor",
            })
        }

        const coursesData = instructorCourses.map((course)=>{

            const totalStudents = course.studentsEnrolled.length
            const totalRevenue = totalStudents * course.price

            const dataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudents,
                totalRevenue,
            };

            return dataWithStats;
        });


        res.status(200).json({
            success:true,
            data:coursesData,
            message:"Instructor stats fetched"
        })

    }catch(err){
        console.log("Err in getting instructor dashboard page data-> " , err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong , Try again!",
        })
    }

};



module.exports={
    getCourseDetails,
    createCourse,
    getAllCourses,
    editCourse,
    getInstructorCourses,
    deleteCourse,
    getFullCourseContent,
    markSubSectionComplete,
    getInstructorDashboard,
}
