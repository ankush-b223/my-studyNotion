const Section = require("../models/sections");
const Course = require("../models/courses");


const createSection = async(req,res)=>{

    try{

        const {courseId,sectionName} = req.body;

        //validate input
        if(!courseId || !sectionName){
            return res.status(400).json({
                success:false,
                message:"Missing fields",
            })
        };

        //create new section
        const newSection = await Section.create({
            sectionName:sectionName,
        });

        //validate
        if(!newSection){
            return res.status(500).json({
                success:false,
                message:"Soemthing went wrong while pushing a new section",
            })
        };

        //link new section to course
        const updateCourse = await Course.findByIdAndUpdate(courseId,{
            $push:{
                courseContent: newSection._id
            }
        },{new:true}).populate({
            path:"courseContent",
            populate:{
                path:"subSection",//send section with populated sub-sections
            }
        }).exec();

        //validate

        //response
        res.status(200).json({
            success:true,
            data:updateCourse,
            message:"New section created successfully",
        });


    }catch(err){
        console.log("Err in creating section-> ", err);
        return res.status(500).json({
            success:false,
            message:"Soemthing went wrong in creating a course section , Try again!",
        })
    }

};

const updateSection = async(req,res)=>{

    try{

        const {sectionId,sectionName} = req.body;

        //validating input
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success:false,
                message:"Missing fields",
            })
        };

        //updating sectionName
        const updatingSection = await Section.findByIdAndUpdate(sectionId,{
            sectionName:sectionName,
        },{new:true});

        //validate

        //response
        res.status(200).json({
            success:true,
            message:"Section updated!",
        })


    }catch(err){
        console.log("Err in updating section-> ", err);
        return res.status(500).json({
            success:false,
            message:"Soemthing went wrong in updating a course section , Try again!",
        })
    }

};

const deleteSection = async(req,res)=>{

    try{

        const {sectionId,courseId}= req.body;

        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing field",
            })
        };

        const deleteSection = await Section.findByIdAndDelete(sectionId);
        //is this req check courseUpdation
        const courseUpdation = await Course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent:sectionId,
            }
        },{new:true});

        //validate 

        res.status(200).json({
            success:true,
            message:"Section deleted successfully",
        })

    }catch(err){
        console.log("Err in deleting section-> ", err);
        return res.status(500).json({
            success:false,
            message:"Soemthing went wrong in deleting a course section , Try again!",
        })
    }

};


module.exports={
    createSection,
    updateSection,
    deleteSection,
}