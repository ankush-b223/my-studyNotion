import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { courseEndpoints, profileEndpoints } from "../apis"
import { resetCourseState, setCourse, setStep } from "../../slices/courseSlice"



export function createCourse(data, token){

    return async(dispatch)=>{


        const toastId = toast.loading("Loading...")
        try {

            const response = await apiConnector("POST", courseEndpoints.CREATE_COURSE_API, data, {
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            })

            console.log("CREATE COURSE API RESPONSE............", response) 

            if (!response?.data?.success) {
                throw new Error(response.data.message)
            }
            toast.success(`${response.data.message}`)
            dispatch(setStep(2));
            dispatch(setCourse(response.data.data))

        } catch (error) {
            console.log("CREATE COURSE API ERROR............", error)
            toast.error(`${error.response.data.message}`)
        }finally{
            toast.dismiss(toastId)
        }
           



    }
    
};

export async function deleteCourse(data, token){

    const toastId = toast.loading("Loading...")
    try {

        const response = await apiConnector("DELETE", courseEndpoints.DELETE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        })

        console.log("delete COURSE API RESPONSE............", response) 

        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }
        toast.success(`${response.data.message}`)

        return true;



    } catch (error) {
        console.log("delete COURSE API ERROR............", error)
        toast.error(`${error.response.data.message}`)
        return false;
        
    }finally{
        toast.dismiss(toastId)
    }

};

export function updateCourse(data, token,navigate){

    return async(dispatch)=>{


        const toastId = toast.loading("Loading...")
        try {



            const response = await apiConnector("POST", courseEndpoints.EDIT_COURSE_API, 
            data, {
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            })

            console.log("CREATE COURSE API RESPONSE............", response) 

            if (!response?.data?.success) {
                throw new Error(response.data.message)
            }
            toast.success(`${response.data.message}`)

            dispatch(resetCourseState());

            navigate("/dashboard/my-courses");

        } catch (error) {
            console.log("update COURSE API ERROR............", error)
            toast.error(`${error.response.data.message}`)
        }finally{
            toast.dismiss(toastId)
        }
           



    }
    
};


export function createSection(data,token){
    return async(dispatch)=>{

        const toastId = toast.loading('Creating a section...');
        try{

            const result = await apiConnector("POST",courseEndpoints.CREATE_SECTION_API ,data,{
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            });

            if(!result.data.success){
                throw new Error(result.data.message)
            }

            toast.success(`${result.data.message}`);

            dispatch(setCourse(result.data.data));

        }catch(err){
            console.log("CREATE section API ERROR............", err)
            toast.error(`${err.response.data.message}`)
        }finally{
            toast.dismiss(toastId)
        }

    }
};

export async function createSubSection(data,token){

        const toastId = toast.loading('Pushing a Lecture...');
        
        try{

            const result = await apiConnector("POST",courseEndpoints.CREATE_SUBSECTION_API ,data,{
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            });

            if(!result.data.success){
                throw new Error(result.data.message)
            }

            toast.success(`${result.data.message}`);
            toast.dismiss(toastId)
            console.log("Data key fom subsection call result -> " , result.data.data);
            
            return result.data.data;

        }catch(err){
            console.log("CREATE SubSection API ERROR............", err)
            toast.error(`${err.response?.data?.message}`)
        }finally{
            toast.dismiss(toastId)
        }

};


export async function getInstructorCourses(token){

    const toastId = toast.loading('Getting Courses...');

    try{

        const result = await apiConnector("GET",courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API,{},
        {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        })
        console.log("response instructor courses for be call",result?.data);
        if(!result.data.success){
            throw new Error(result.data.message)
        }

        toast.success(`${result.data.message}`);
        toast.dismiss(toastId)

        return result.data.data;

    }catch(err){
        console.log("instructor courses API ERROR............", err)
        toast.error(`${err.response?.data?.message}`)

    }finally{
        toast.dismiss(toastId)
    }



};


export async function getCoursePageDetails(data,token){

    try{
        const result = await apiConnector("POST",courseEndpoints.COURSE_DETAILS_API,data,{
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        });

        if(!result.data.success){
            throw new Error(result.data.message)
        }
        console.log("Response from get course page details api -> ",result?.data?.data);
        return result?.data?.data;

    }catch(err){
        console.log("Err in fetching course page details",err);
        toast.error("Something went wrong, Try again!");
        return null;
    }


};

export async function getInstructorStats(token){

    const toastId = toast.loading('Getting Courses...');

    try{

        const result = await apiConnector("GET",profileEndpoints.GET_INSTRUCTOR_STATS_API,{},
        {
            Authorisation: `Bearer ${token}`,
        })

        console.log("Response from stats api call-> " , result?.data);

        if(!result.data.success){
            throw new Error(result.data.message)
        }

        toast.success(`${result.data.message}`);

        return result?.data?.data;     

    }catch(err){
        console.log("instructor stats API ERROR............", err)
        toast.error(`${err.response?.data?.message}`)

    }finally{
        toast.dismiss(toastId)
    }

};


