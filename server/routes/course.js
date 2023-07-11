const express = require("express");
const router = express.Router();

//route middlewares
const {auth,isAdmin,isInstructor,isStudent} = require("../middlewares/auth");

//fetching controllers
const {getCourseDetails,
    createCourse,
    getAllCourses,
    editCourse,
    getInstructorCourses,
    deleteCourse,
    getFullCourseContent,
    markSubSectionComplete,
    getInstructorDashboard} = require("../controllers/course");

const {categoryPageDetails,
    showAllCategories,
    createCategory,
    categoryPageDetailsSorted} = require("../controllers/category");

const {getAllRatings,
    getAverageRating,
    createRating,
    checkReviewExists} = require("../controllers/rating&review");

const { createSection,
    updateSection,
    deleteSection} = require("../controllers/section");

const {  createSubSection,
    updateSubSection,
    deleteSubSection} = require("../controllers/subSection");



//routes
router.post("/getCourseDetails" , getCourseDetails );  //courses
router.post("/createCourse" , auth , isInstructor , createCourse );
router.get("/getAllCourses", getAllCourses );
router.post("/updateCourse",auth,editCourse);
//few routes pending for courses
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);
router.delete("/deleteCourse", auth , isInstructor , deleteCourse);
router.post("/getFullCourseContent" , auth , isStudent , getFullCourseContent);
router.post("/updateCourseProgress",auth , isStudent , markSubSectionComplete );
router.get("/getInstructorStats",auth , isInstructor , getInstructorDashboard)

router.post("/createCategory" , auth , isAdmin , createCategory );   //categories
router.post("/categoryPageDetails" , categoryPageDetails ); //test the sorted one
router.get("/showAllCategories" , showAllCategories );

 
router.get("/getAllRatings" , getAllRatings );  //ratings
router.get("/getAverageRating" , getAverageRating);
router.post("/createRating" , auth , isStudent , createRating);
router.post("/checkExistingReview",auth,isStudent,checkReviewExists);

                                                        //sections
router.post("/createSection" , auth , isInstructor , createSection);   ///try using diff http methods acc to req
router.post("/updateSection" , auth , isInstructor , updateSection);
router.post("/deleteSection" , auth, isInstructor , deleteSection);

                                                        //subSections
router.post("/createSubSection" , auth , isInstructor ,createSubSection);
router.post("/updateSubSection" , auth , isInstructor , updateSubSection);
router.post("/deleteSubSection" , auth , isInstructor , deleteSubSection);





module.exports = router;