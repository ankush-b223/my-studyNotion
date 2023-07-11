import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import {  COURSE_STATUS } from '../../../../utilities/constants';
import { useNavigate } from 'react-router-dom';
import { updateCourse } from '../../../../services/operations/courseApi';

const Publish = () => {

  const {register,handleSubmit} = useForm();
  
  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (data)=>{
    console.log("data from form",data);

    if(data.publish){

      const courseId = course._id;
      
      const formData = new FormData();

      formData.append("courseId", courseId);
      formData.append("status", COURSE_STATUS.PUBLISHED)


      dispatch(updateCourse(formData,token,navigate))

    }else{
      navigate("/dashboard/my-courses");
    }




  }

  return (
    <div>
      <div className=' bg-richblack-700 p-10 rounded-md'>
        
        <form onSubmit={handleSubmit(submitHandler)} className=' flex flex-col gap-y-7'>
          <h2 className=' text-3xl font-bold'>Publish Settings</h2>
          <label htmlFor='publish' className=' flex flex-row justify-between items-center w-[47%]'> 
            <input type='checkbox' name='publish' {...register("publish")} />
            <span className=' text-sm font-semibold'>Make this course public</span>
            
          </label>
          <button type='submit' className=' bg-yellow-50 px-1 py-2 rounded-lg hover:scale-105 
          transition-all duration-300
           text-richblack-900 font-semibold'>Save</button>
        </form>
      </div>

      <div>
        {/* bttns div */}
      </div>
    </div>
  )
}

export default Publish