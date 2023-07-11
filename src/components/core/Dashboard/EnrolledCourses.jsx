import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getEnrolledCourses } from '../../../services/operations/profileApi';
import Spinner from '../../common/Spinner';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const {token} = useSelector((state)=>state.auth);

    const [loading, setLoading] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const navigate = useNavigate();

    const fetchEnrolledCourse = useCallback( async()=>{
        setLoading(true);
        let fetched = await getEnrolledCourses(token);
        setEnrolledCourses(fetched);
        console.log("result from api-> " , fetched);
        console.log("Its length is -> " , fetched.length );
        setLoading(false);
    },[token]);

    useEffect(()=>{
        fetchEnrolledCourse();
    },[fetchEnrolledCourse]);

  return (

    <div className=' w-[100%] flex flex-col justify-start items-center mx-auto text-richblack-5'>
         <h2 className=' text-richblack-5 font-bold text-2xl mt-3' >Enrolled Courses</h2>
        {
            loading ? (<Spinner></Spinner>):(



                enrolledCourses.length === 0 ? (<div>
                    No courses Enrolled yet!
                </div>):(
                    <div className=' text-richblack-5 flex flex-col justify-center items-center
                        w-11/12 mx-auto p-10 gap-y-5'
                    >
            
                       
                
                        <div className=' bg-richblack-800 rounded-lg p-7 flex flex-col gap-y-4 w-5/6'>

                            {
                                enrolledCourses.map((course,index)=>{ //add link to view Course here
                                    return(<div key={index} onClick={ ()=> {
                                        navigate(`/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/subSection/${course?.courseContent?.[0]?.subSection?.[0]?._id}`)
                                    }}
                                        className=' flex flex-row justify-between items-center
                                     gap-x-3 bg-richblack-700 p-2 rounded-lg text-richblack-200
                                     font-semibold text-sm 
                                     hover:scale-105 transition-all duration-300 hover:cursor-pointer'>
                                        <img src={course.thumbnail} alt='courseThumbnail' 
                                        className=' w-[20%] h-[100px] rounded-lg'/>
                                        <h2 className=' text-richblack-5 font-bold text-lg'>
                                            {course.courseName}</h2>
                                        <p >{course.courseDescription}</p>
                                    </div>)
                                })
                            }
                
                        </div>
            
            
            
                    </div>
                )
                
            )
        }
    </div>
    
        
    
   
  )
}

export default EnrolledCourses