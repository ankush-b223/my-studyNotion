import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { toast } from 'react-hot-toast';
import { addReview } from '../../../services/operations/viewCourseApi';

const CourseReviewModal = ({setReviewModal,courseId}) => {

  const {user} = useSelector((state)=>state.profile);
  const {token} = useSelector((state) => state.auth);
  const {courseEntireData} = useSelector((state)=> state.viewCourse);


    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: {errors},
    } = useForm();

    const ratingChanged =(newRating)=>{
      setValue("rating", newRating);
    }

    const onSubmit = async(data)=>{
      if(data?.rating === 0 ){
        toast.error("Please add a Rating to submit ")
        return ;
      }
        
      const body = {
        ...data,courseId
      };

      console.log("body-> ", body);

      const res = await addReview(body,token);

      if(res){
        setReviewModal(null);
      }else{
        reset()
      }
    }

    useEffect(()=> {
      setValue("review", "");
      setValue("rating", 0);

      //eslint-disable-next-line
    },[])

  return (
    <div className=' fixed inset-0 !mt-0
            bg-white bg-opacity-10 backdrop-blur-sm 
            flex justify-center items-center m-auto z-[1000]'>

                <div className=' w-fit rounded-lg border border-richblack-400
                 bg-richblack-800 p-10  gap-4 px-12
                 flex flex-col justify-center items-center'>

                    <h3 className=' text-richblack-5 
                    text-3xl font-bold underline'>
                      Add Review!
                    </h3>

                    <p className=' text-xs '> For Course: <span className=' underline text-yellow-50
                     underline-offset-4'>
                        {courseEntireData?.courseName}
                      </span>
                    </p>

                    <div className=' mt-2 flex flex-col justify-center gap-y-2 items-center'>
                        <img src={user?.image} className=' w-[110px] rounded-full' alt='Dp'/>
                        <div className=' flex flex-col'>
                          <p className=' text-sm text-richblack-50'>{user?.firstName} {user?.lastName}</p>
                          <p className='text-xs'>Posting Publicly</p>
                        </div>
                    </div>

                    <div className=' flex gap-x-3'>


                      <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col 
                      justify-center items-center'>
                        <ReactStars
                          count={5}
                          onChange={ratingChanged}
                          size={24}
                          activeColor="#ffd700"
                        />

                        <div className=' mt-3'>
                          <label htmlFor='courseExperience' className='text-sm'>
                          </label>
                          <textarea
                             id='courseExperience'
                             placeholder='Add Your Experience here'
                             {...register("review", {required:true})}
                             className='form-style min-h-[130px] min-w-[340px] mt-1 text-sm p-2 rounded-md
                             bg-richblack-700 w-full'

                          />
                          {
                            errors.courseExperience && (
                                <span>
                                    Please add your experience
                                </span>
                            )
                          }
                        </div>
                          <div className=' flex flex-row gap-x-2 mt-2'>
                            <button type='submit'
                                className=' bg-yellow-50 font-semibold text-center
                                hover:scale-105 transition-all duration-200 rounded-md
                                text-richblack-900 w-fit px-3 py-1'
                            >
                              Post Review!
                            </button>

                            <button
                                className=' bg-richblack-400 font-semibold text-center
                                hover:scale-105 transition-all duration-200 rounded-md
                                text-richblack-900 w-fit px-3 py-1'
                            onClick={()=>{
                              setReviewModal(null)
                            }}>Cancel</button>
                          </div>
                      
                      </form>

                        

                    </div>

                </div>

    </div>
  )
}

export default CourseReviewModal