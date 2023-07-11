import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { createSection } from '../../../../services/operations/courseApi';
import NestedSections from './helpers/NestedSections';
import {GrFormNext} from "react-icons/gr"
import { setStep } from '../../../../slices/courseSlice';

const CourseBuilder = () => {

  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);

  const dispatch = useDispatch();

  const {register,
    // setValue,
    reset,handleSubmit,
    // formState:{errors}
  } = useForm();

  const submitHandler = (data)=>{
    // const formData = new FormData();

    // // Convert data object to FormData
    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]);
    // });
    const courseId = course._id;
    const theData = {...data,courseId}

    console.log("Data coming form section form -> ", data);
    dispatch(createSection(theData,token));
    reset();

  }
  
  const goNext = ()=>{

    dispatch(setStep(3))
  }

  useEffect( ()=>{
    console.log("Check course object in state->" , course);

  },[course])

  return (
    <div className=' '>
      <div className='text-richblack-200 bg-richblack-800 w-full flex flex-col
       justify-center items-start gap-y-5 p-4 rounded-md mb-10 relative pb-16 '>
        <label className=' text-lg text-richblack-5 font-bold'>Course Builder</label>

        <form onSubmit={handleSubmit(submitHandler)} className=' relative flex flex-col gap-y-2 w-11/12 pb-12'>

            <input
              type='text'
              name='sectionName'
              placeholder='Enter Section Name'
              className='  bg-richblack-700 text-sm w-full
              px-4 py-3 rounded-md  font-bold text-richblack-200 uppercase'
              {...register("sectionName")}
            />

            <button type='submit' className=' w-fit px-2 py-1 font-bold
           text-richblack-900 rounded-md absolute right-1 bottom-1 translate-x-9 translate-y-1
            bg-yellow-50 hover:scale-105 hover:bg-yellow-25 transition-all duration-200'>
              Create Section</button>


        </form>

        {
          course.courseContent?.length > 0 &&(
            <div className=' w-11/12 '>
              <NestedSections/>
            </div>
          )
        }

        <button className=' w-fit px-2 py-1 rounded-md bg-yellow-50 
          hover:scale-125 text-richblack-900 transition-all duration-200 absolute right-4 bottom-4'
         onClick={goNext}>
          <div className=' flex flex-row gap-x-0.5 justify-center items-center
            font-semibold '>
              
              <p>Next</p>
              <GrFormNext/>
              

          </div>   

        </button>   

      </div>
        
      

      

    </div>
  )
}

export default CourseBuilder