import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalLectures } from "../../slices/viewSlice";


export async function getFullCourseContent(courseId,token,dispatch){

    const toastId = toast.loading("Fetching course Content...");

    try{
        console.log("courseId in sevice-> ", courseId);
        const result = await apiConnector("POST",courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED,
        {courseId},{
            Authorisation: `Bearer ${token}`,
        });

        const actualResponse = result?.data?.data;

        if(!result?.data?.success){
            throw new Error(result?.data?.message)
        }

        //redux logic
        dispatch(setEntireCourseData(actualResponse?.theCourse));
        dispatch(setCourseSectionData(actualResponse?.theCourse?.courseContent))
        
        let lectures = 0;
        actualResponse?.theCourse?.courseContent.forEach((section)=>{
            lectures += section?.subSection.length    
        });
        dispatch(setTotalLectures(lectures));
        dispatch(setCompletedLectures(actualResponse?.courseProgress))

        toast.success("Course Content Fetched");

        return actualResponse;

    }catch(err){
        console.log("Err in getCourseContent-> ", err);
        toast.error(`${err?.response?.data?.message}`)
        return null;

    }finally{
        toast.dismiss(toastId);
    }

};

export async function addReview(body,token){
    const toastId = toast.loading("Pushing your Review...");

    try{

        const result = await apiConnector("POST",courseEndpoints.CREATE_RATING_API,body,{
            Authorisation: `Bearer ${token}`,
        });

        if(!result?.data?.success){
            throw new Error(result?.data?.message)
        }

        toast.success("Review created!");

        return true


    }catch(err){
        console.log("Err in creating the new review->", err);
        toast.error(`${err?.response?.data?.message}`)
        return false
        
    }finally{
        toast.dismiss(toastId);
    }
};

export async function checkReviewAdded(body,token){
    const toastId = toast.loading("Checking for existing reviews...");

    try{
        const result = await apiConnector("POST",courseEndpoints.CHECK_EXISTING_REVIEW,{courseId:body},{
            Authorisation: `Bearer ${token}`,
        });
        console.log("Result from check call-> " , result?.data);

        if(!result?.data?.success){
            throw new Error(result?.data?.message)
        }

        return false;


    }catch(err){
        console.log("Err in creating the new review->", err);
        toast.error(`${err?.response?.data?.message}`)
        return true
        
    }finally{
        toast.dismiss(toastId);
    }
};

export async function markLectureComplete(completedLectures,subSectionId,courseId,token,dispatch){

    const toastId = toast.loading("Marking Lecture as complete...");

    try{
        console.log("here");



        const result = await apiConnector("POST"  , courseEndpoints.LECTURE_COMPLETION_API ,
         {courseId,subSectionId},
        {
            Authorisation: `Bearer ${token}`,
        });
        console.log("Response form be call-> ", result?.data);

        if(!result?.data?.success){
            throw new Error(result?.data?.message)
        }
        dispatch(setCompletedLectures([...completedLectures,subSectionId]))
        toast.success("Lecture marked Complete!");
        return true;

    }catch(err){
        console.log("Err in marking lecture as complete-> ", err);
        toast.error(`${err?.response?.data?.message}`);
        return false;

    }finally{
        toast.dismiss(toastId);
    }

}