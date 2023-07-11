import React, { useEffect, useState } from 'react'
import { getInstructorCourses } from '../../../../services/operations/courseApi'
import { useSelector } from 'react-redux';
import Spinner from '../../../common/Spinner';
import CourseCard from './CourseCard';
import ConfirmationModal from '../../../common/ConfirmationModal'
import { useNavigate } from 'react-router-dom';

//entire edit flow is left


const MyCourses = () => {

  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(null)

  const {token} = useSelector((state)=>state.auth);

  const navigate = useNavigate();
  

  const fetchUserCourses = async()=>{
    const courses = await getInstructorCourses(token);
    setUserCourses(courses);
  }
  useEffect(()=>{

      setLoading(true)
      fetchUserCourses();
      setLoading(false);

   

    // eslint-disable-next-line
  },[]);

  useEffect(()=>{
    console.log("instructor courses state-> ",userCourses);
  },[userCourses])
  
  if(loading){
    return (<div className=' flex flex-col justify-center items-center w-full mx-auto'>
        <Spinner/>
      </div>
    )

  }else{

    return (
      <div className=' text-richblack-5 w-11/12 flex flex-col justify-center items-center '>

        <div className=' w-full flex flex-row justify-between items-center p-2 mt-4'>

          <p className=' text-xl font-bold'>My Courses</p>
          <button onClick={ ()=> navigate("/dashboard/add-course")} className=' w-fit px-2 py-1 font-bold
           text-richblack-900 rounded-md text-xl
            bg-yellow-50 hover:scale-105 hover:bg-yellow-25 transition-all duration-200'>
              New
          </button>

        </div>

        <div className=' w-full flex flex-col justify-center items-center mx-auto gap-y-5 mt-10'>

          { userCourses ? 
            userCourses.map((course)=>{
              return(
                <CourseCard key={course._id} 
                  course={course} setter={fetchUserCourses} setModal={setConfirmationModal} />
              )
            }) : <p  className=' text-xl font-bold' > No courses to show</p>
          }

        </div>

        {
            confirmationModal && <ConfirmationModal data={confirmationModal}/>
        }

      </div>
    )

  }

  
}

export default MyCourses