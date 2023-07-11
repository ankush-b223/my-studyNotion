import React from 'react'
import Upload from "../Upload";
import {RxCross1} from "react-icons/rx"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection } from '../../../../../services/operations/courseApi';
import { setCourse } from '../../../../../slices/courseSlice';


const SubSectionalModal = ({data,setter,
    add=false,view=false,edit=false}
    ) => {

        const {
            register, 
            handleSubmit, 
            setValue,
            formState: {errors},
            // getValues,
        } = useForm();

        const dispatch = useDispatch();

        const {token} = useSelector((state)=>state.auth);
        const {course} = useSelector((state)=>state.course);


        const submitHandler = async(dataF)=>{
            // const formData = new FormData();    
            
            const fullData = {...dataF,sectionId:data}
            // console.log(fullData);
            // Convert data object to FormData
            // Object.keys(fullData).forEach((key) => {
            // formData.append(key, data[key]);
            // });

            // console.log("FormData-> " ,formData);
            const updatedSection  = await createSubSection(fullData,token);
            //updating courcontent
            const updatingCourse = course?.courseContent.map((sec)=>
                sec._id === updatedSection._id  ? updatedSection : sec
                    
            ); 
            const updatedCourse = { ...course, courseContent: updatingCourse }
            console.log("Updated course after subsection call -> " , updatedCourse);
            //updating the state
            dispatch(setCourse(updatedCourse));
            setter(null);
            
        }


        return (

            <div className=' fixed inset-0 !mt-0
            bg-white bg-opacity-10 backdrop-blur-sm 
            flex justify-center items-center mx-auto z-[1000]  '>

                <div className=' w-[52%] rounded-lg border border-richblack-400
                 bg-richblack-800 p-5 pb-10  gap-2 px-12  m-auto mt-4 
                 flex flex-col justify-center items-center   '>
                    <div className=' flex flex-row justify-between w-11/12 border-b-2
                     border-richblack-700  '>
                        <h2 className=' font-bold text-xl'>{ add ? "Adding" : edit ? "Editing": "Viewing"}  Lecture</h2>
                        <button onClick={()=>{
                            setter(null)
                        }}>
                            <RxCross1 />
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit(submitHandler)} 
                    className=' w-3/4  flex flex-col gap-y-2 p-1 relative'>

                        <Upload 
                            name="videoFile"
                            label="Lecture Video"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            video={true}
                            viewData={view ? data.videoUrl : null}
                            editData={edit ? data.videoUrl : null}
                        />

                        <div>
                            <label className='text-sm font-semibold'>Lecture Title</label>
                            <input 
                                 className='  bg-richblack-700 text-sm w-full
                                 px-4 py-3 rounded-md  font-semibold text-richblack-200'
                                id='title'
                                placeholder={view? `${data.title}`:'Enter Lecture Title'}
                                disabled={view}
                                {...register("title", {required:true})}

                            />
                            {errors.title && (<span>
                                Lecture Title is required
                            </span>)}
                        </div>

                        <div>
                            <label className='text-sm font-semibold '>Lecture Description</label>
                            <textarea 
                                id='description'
                                placeholder={view? `${data.description}`:'Enter Lecture Description'}
                                disabled={view}
                                {...register("description", {required:true})}
                                className=' bg-richblack-700 text-sm w-full
                                px-4 py-3 rounded-md  font-semibold text-richblack-200 min-h-[50px]'
                            />
                            {
                                errors.description && (<span>
                                    Lecture Description is required
                                </span>)
                            }
                        </div>

                        {
                            !view && (
                                <button type='submit' 
                                className=' w-fit px-2 py-1 rounded-md font-semibold bg-yellow-50 
                                hover:scale-105 text-richblack-900 transition-all duration-200 
                                absolute right-0 bottom-1 translate-y-9 translate-x-6
                                '>Save</button>
                            )
                        }
                        
                    </form>
                    

                </div>


            </div>
        )
}

export default SubSectionalModal