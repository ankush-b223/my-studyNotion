const SubSection = require("../models/subSections");
const Section = require("../models/sections");
 
const {uploadImageToCloudinary} = require("../utils/cloudinaryUploader");

require("dotenv").config();


const createSubSection = async(req,res)=>{

    try{

        const {title,description,sectionId} = req.body;

        //fetching videoFile
        const {videoFile} = req.files;

        if (!title || !description || !videoFile || !sectionId) {
            return res
              .status(404)
              .json({
                    success: false,
                    message: "Missing fields",
                })
        };

        //uploading file to cloudinary
        const fileUpload = await uploadImageToCloudinary(videoFile,process.env.CLOUDINARY_VIDEO_FOLDER);

        //validate

        //getting link
        const videoUrl = fileUpload.secure_url;

        const newSubSection = await SubSection.create({
            title:title,
            timeDuration: `${fileUpload.duration}`, //duration from cloud return object
            description:description,
            videoUrl:videoUrl,
        });

        //update respective section with new subSection id
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{
            $push:{
                subSection:newSubSection._id
            }
        },{new:true}).populate("subSection").exec();

        //validate

        //response
        res.status(200).json({
            success:true,
            data:updatedSection,
            message:"New sub-section created",
        });




    }catch(err){
        console.error("Error in creating Subsection->", err);
		res.status(500).json({
			success: false,
			message: "Something went wrong in creating subSection",
		});
    }


};

const updateSubSection = async(req,res)=>{

    try{
        
        const {title,description,subSectionId} = req.body;

        //validate subSectionId
        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(400).json({
                success:false,
                message:"Invalid parameter",
            })
        };

        //if any field is present in body update it
        if(title !== undefined){
            subSection.title = title
        };

        if(description !== undefined){
            subSection.description = description
        };

     
        if(req.files && req.files.videoFile !== undefined){
            console.log("inside cideo update of subSection update");
            const uploadUpdate = await uploadImageToCloudinary(req.files.videoFile ,
                 process.env.CLOUDINARY_VIDEO_FOLDER);

            subSection.timeDuration = uploadUpdate.duration
            subSection.videoUrl = uploadUpdate.secure_url
        };

        //save updates
        await subSection.save();

        res.status(200).json({
            success:true,
            message:"SubSection updated successfully",
        });



    }catch(err){
        console.error("Error in updateSubSection->", err);
		res.status(500).json({
			success: false,
			message: "Something went wrong in updating subSection",
		});
    }


};

const deleteSubSection = async(req,res)=>{

    try{

        //try implementing a pre delete hook to subsection to delete the refernces in section objects

        const {subSectionId,sectionId} = req.body;

        //validate

        //delete subSection
        const deleteSubSection = await SubSection.findByIdAndDelete(subSectionId);


        //validation
        if(!deleteSubSection){
            return res.status(400).json({
                success:false,
                message:"Invalid parameter",
            })
        };

        //delete link form section object //add validation of sectionId
        const deleteLink = await Section.findByIdAndUpdate(sectionId,{
            $pull:{
                subSection:subSectionId,
            }
        },{new:true});

        //response
        res.status(200).json({
            success:true,
            message:"SubSection deleted successfully",
        });





    }catch(err){
        console.error("Error in deleteSubSection->", err);
		res.status(500).json({
			success: false,
			message: "Something went wrong in deleting SubSection",
		});
    }


};


module.exports = {
    createSubSection,
    updateSubSection,
    deleteSubSection
};