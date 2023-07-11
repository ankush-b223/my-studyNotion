
require("dotenv").config();
const jwt = require("jsonwebtoken");

//auth
const auth =async (req,res,next)=>{

    try{

        const token = req.cookies.token || 
            req.header("Authorisation").replace("Bearer ", "");
        if(!token || token === undefined){
            return res.status(400).json({
                success:false,
                message:"Token missing"
            })
        };



        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET );

            //add the payload to the request object for access to further middlewares/controllers 
            req.user = payload;

        }catch(err){
            console.log("Err in auth",err);
            return res.status(400).json({
                success:false,
                message:"invalid token or Token expired , login again!"
            })
        };

        next();

    }catch(err){
        console.log("Error in auth middleware-> ",err);

        return res.status(500).json({
            success:false,
            message:"Something wrong in auth middleware",
        })
    }


}

//isStudent
const isStudent = async(req,res,next)=>{

    try{

        const payload = req.user;

        if(payload.role !== "Student"){
            return res.status(400).json({
                success:false,
                message:"This is a Students' only route",
            })
        };

        next();

        

    }catch(err){
        console.log("Error in isStudent middleware-> ",err);

        return res.status(500).json({
            success:false,
            message:"Something wrong in isStudent middleware",
        })
    }

}




//isInstructor
const isInstructor = async(req,res,next)=>{

    try{

        const payload = req.user;

        if(payload.role !== "Instructor"){
            return res.status(400).json({
                success:false,
                message:"This is a Instructors' only route",
            })
        };

        next();
        

    }catch(err){
        console.log("Error in isInstructor middleware-> ",err);

        return res.status(500).json({
            success:false,
            message:"Something wrong in isInstructor middleware",
        })
    }

}



//isAdmin
const isAdmin = async(req,res,next)=>{

    try{

        const payload = req.user;

        if(payload.role !== "Admin"){
            return res.status(400).json({
                success:false,
                message:"This is a Admins' only route",
            })
        };

        next();


        

    }catch(err){
        console.log("Error in isAdmin middleware-> ",err);

        return res.status(500).json({
            success:false,
            message:"Something wrong in isAdmin middleware",
        })
    }

}


module.exports={
    auth,
    isStudent,
    isAdmin,
    isInstructor
}