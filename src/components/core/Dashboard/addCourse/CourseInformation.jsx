import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../../../services/apiConnector';
import { categories } from '../../../../services/apis';
import ChipInput from './helpers/ChipInput';
import Upload from './Upload';
import Requirements from './helpers/Requirements';
import { useDispatch, useSelector } from 'react-redux';

import { createCourse } from '../../../../services/operations/courseApi';

const CourseInformation = () => {

  const dispatch = useDispatch();
  const {token} = useSelector((state)=> state.auth);
  

  const {register ,setValue, handleSubmit,formState:{errors}} = useForm();

  const submitHandler = (data)=>{
    const formData = new FormData();

    // Convert data object to FormData
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    dispatch(createCourse(formData,token))

  }

  const [subCategories, setSubCategories] = useState([]);

  const fetchSubCategories = async()=>{
    const result = await apiConnector("GET" ,
    categories.CATEGORIES_API );

    const toShowCategories = result.data.data

    setSubCategories(toShowCategories);

  }

  useEffect( ()=>{
    fetchSubCategories();
  },[])

  return (
    <div className=' w-[100%] pb-4'>

      <form onSubmit={handleSubmit(submitHandler)}
       className=' relative  flex pb-10 flex-col gap-y-4 bg-richblack-800 p-4 text-sm rounded-md w-[100%] mx-auto'>

        <div className=' flex flex-col w-11/12 mx-auto gap-y-2  '>
          <label>Course Title</label>
          <input className=' bg-richblack-700 text-base w-[100%]
            px-4 py-2 rounded-md  text-richblack-200'
            type='text' 
            placeholder='Enter Course Title '
            name='courseName'
            
            {...register("courseName",{required:true})}
            />
            {
              errors.courseName && (
                <span>Category is required</span>
              )
            }
        </div>

        <div className=' flex flex-col w-11/12 mx-auto gap-y-2'>  
          <label>Course Short Description</label>
          <textarea className=' bg-richblack-700 text-base  w-[100%]
            px-4 py-2 rounded-md text-richblack-200 ' 
            type='text' 
            name='courseDescription'
            placeholder='Enter Course Description'
            rows="4"
            {...register("courseDescription")}/>
        </div>

        <div className=' flex flex-col w-11/12 mx-auto gap-y-2'>
          <label>Price</label>
          <input className=' bg-richblack-700 text-base text-richblack-200  w-[100%]
            px-4 py-2 rounded-md appearance-none '
            type='number' 
            name='price'
            placeholder='Enter Course Price'
            {...register("price")}/>
        </div>
 
        <div className=' flex flex-col w-11/12 mx-auto gap-y-2'>
          {/* category drop-down custom */}
          <label htmlFor='category' >Category</label>
          <select name='category' className=' bg-richblack-700 text-base text-richblack-200  w-[100%]
            px-4 py-2 rounded-md' 
          defaultValue="" {...register("categoryId")}>
              <option value="" disabled hidden 
              
              >Select a category</option> 
          {
            subCategories.map((category)=>{
              return(
                <option key={category._id} value={category._id}>{category.name}</option>
              )
            })
          }
          </select>
        </div>

        <div className=' flex flex-col w-11/12 mx-auto gap-y-2'>
          {/* tags */}
          <ChipInput
          label="Tags"
          name="tag"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          />
        </div>
        
        <div className=' flex flex-col w-11/12 mx-auto gap-y-2'>
          {/* course thumbnail custom */}
          <Upload
            name="thumbnail"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={/*editCourse ? course?.thumbnail :*/ null}
          />

        </div>

        <div className=' flex flex-col w-11/12 mx-auto gap-y-2'>
          {/* benefits of the course */}
          <label>Benefits of the course</label>
          <input className=' bg-richblack-700 text-base  w-[100%]
            px-4 py-2 rounded-md text-richblack-200 '
            type='text' 
            name='whatWillYouLearn'
            placeholder='Enter Course Benefits '
            {...register("whatWillYouLearn")}/>
        </div>
 
        <div className=' flex flex-col w-11/12 mx-auto gap-y-2'>

          {/* requirements of the course custom */}
          <Requirements
          name="instructions"
          label="Requirements/Instructions"
          placeholder="Write Instructions & press Enter"
          register={register}
          setValue={setValue}
          errors={errors}
          />
        </div>

          <button type='submit'  className=' w-fit px-2 py-1 font-bold
           text-richblack-900 rounded-md absolute right-5 bottom-3
            bg-yellow-50 hover:scale-105 hover:bg-yellow-25 transition-all duration-200'>
            Next</button>




      </form>

    </div>
  )
}

export default CourseInformation