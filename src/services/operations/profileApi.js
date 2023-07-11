import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"


export async function getEnrolledCourses(token){
    

        let courses =[];

        try{

            const result = await apiConnector("GET",profileEndpoints.GET_USER_ENROLLED_COURSES_API,{},{
                "Content-Type":"multipart/form-data",
                Authorisation: `Bearer ${token}`,
            });

            if(!result.data.success){
                throw new Error(result.data.message);
            };

            courses = result.data.data;

        }catch(err){
            console.log("Error in fetching enrolled courses",err);
            toast.error(`${err.response.data.message}`)
        }

        return courses;

    
}