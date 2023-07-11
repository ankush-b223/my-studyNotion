const express = require("express");
const router = express.Router();

//route middlewares
const {auth} = require("../middlewares/auth");

//fetching controllers
const {updateProfile,
    updateDisplayPicture,
    getAllUserDetails,
    getEnrolledCourses,
    deleteAccount} = require("../controllers/profile"); 



//routes
router.put("/updateProfile", auth , updateProfile);
router.put("/updateDisplayPicture" , auth , updateDisplayPicture);
router.delete("/deleteProfile" , auth , deleteAccount); //yet to be tested
router.get("/getUserDetails" , auth , getAllUserDetails);
router.get("/getEnrolledCourses" , auth , getEnrolledCourses);



module.exports = router;