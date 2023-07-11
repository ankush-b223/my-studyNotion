const Rating = require("../models/rating&reviews");
const Course = require("../models/courses");

const mongoose = require("mongoose");

const createRating = async(req,res)=>{

    try{

        const {id} = req.user;

        const {rating,review,courseId} = req.body;

        //input validation
        if(!rating || !review || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing fields",
            })
        }; 

        //check if user is enrolled in course
        const studentCheck = await Course.findOne({
            _id:courseId,
            studentsEnrolled:{ $elemMatch: {$eq:id} },
        });

        if(!studentCheck){
            return res.status(400).json({
                success:false,
                message:"User not enrolled into the course",
            })
        };

        //check for existing reviews
        const existingRating = await Rating.findOne({
            user:id
        });

        if(existingRating){
            return res.status(400).json({
                success:false,
                message:"Review by user already exists",
            })
        };

        //create new rating & review
        const newRating = await Rating.create({
            user:id,
            rating:rating,
            review:review,
            course:courseId
        });

        if(!newRating){
            return res.status(500).json({
                success:false,
                message:"Something went wrong while pushing new rating",
            })
        };


        //update course with new rating
        const updateCourse = await Course.findByIdAndUpdate(courseId , {
            $push: {
                ratingAndReviews:newRating._id
            }
        });


        if(!updateCourse){
            return res.status(500).json({
                success:false,
                message:"Something went wrong while pushing new rating to course",
            })
        };

        //response
        res.status(200).json({
            success:true,
            message:"Rating published",
        });




    }catch(err){
        console.log("Err in creating rating-> ", err);
        return res.status(500).json({
            success:false,
            message:"Soemthing went wrong in creating the rating , Try again!",
        })
    }

};


const getAverageRating = async(req,res)=>{

    try{

        //match with rating objects where courseId mathces 

        //in the group of objects for a respective course's ratings -> average of rating field of all 
        //objects' rating field stored in a variable

        const {courseId} = req.body;

        //aggregation pipeline with 2 stages
        const averageRating = await Rating.aggregate([
            {
                $match:{//stage 1 matches all objects with courseId
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{ //all docs from match -> calc avg rating and store in average
                    _id:null,
                    average: {$avg: "$rating"},
                }
            }
        ]);

        //if rating exists
        if(averageRating.length > 0 ){
            return res.status(200).json({
                success:true,
                data:averageRating[0].average,
                message:"average rating fetched",
                //clg and check values 

            })
        };

        //length = 0 -> no ratings found for course
        res.status(200).json({
            success:true,
            data:0,
            message:"No ratings exist for the course yet",
        })


    }catch(err){
        console.log("Err in getAverageRating-> ", err);
        return res.status(500).json({
            success:false,
            message:"Soemthing went wrong in getting Average Rating , Try again!",
        })
    }

};


const getAllRatings = async(req,res)=>{

    try{

        //fetch all rating objects -> sort by highest ratings -> populate 
        //user-> name email image & course -> courseName
        const allReviews = await Rating.find({}).sort({
            rating:"desc"}
        ).populate({//think sql select 
            path:"user",
            select:"firstName lastName email image",
        }).populate({//think sql select
            path:"course",
            select:"courseName",
        }).exec()

        //validation
        if(!allReviews){
            res.status(400).json({
                success:false,
                message:"Something went wrong",
            })
        };

        //response
        res.status(200).json({
            success:true,
            data:allReviews,
            message:"All reviews fetched",
        });
       


    }catch(err){
        console.log("Err in getAllRatings-> ", err);
        return res.status(500).json({
            success:false,
            message:"Soemthing went wrong in getting All Ratings, Try again!",
        })
    }

};

const checkReviewExists = async(req,res)=>{

    try{

        const {courseId} = req.body;
        const {id} = req.user;

        //add validation


        const checkReviews = await Rating.findOne({
            user:id,
            course:courseId,
        })


        if(checkReviews){
            return res.status(400).json({
                success:false,
                message:"Course is already reviewed by user!"
            })
        }else{
            res.status(200).json({
                success:true,
                message:"No exisitng review found!"
            })
        }
       


    }catch(err){
        console.log("Err in getAllRatings-> ", err);
        return res.status(500).json({
            success:false,
            message:"Soemthing went wrong in checking for reviews, Try again!",
        })
    }

};


module.exports={
    getAllRatings,
    getAverageRating,
    createRating,
    checkReviewExists,

}