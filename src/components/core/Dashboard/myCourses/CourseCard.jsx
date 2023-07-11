import React from 'react'
import {BsCurrencyRupee} from "react-icons/bs"
import {AiOutlineEdit,AiOutlineDelete} from "react-icons/ai"
import { COURSE_STATUS } from '../../../../utilities/constants'
import { deleteCourse } from '../../../../services/operations/courseApi'
import { useSelector } from 'react-redux'


const CourseCard = ({course,setter,setModal}) => {

    const {token} = useSelector((state)=>state.auth);


    const deleteProcessor = () =>{

        const data = {
            courseId: course._id
        }

        const call = deleteCourse(data,token).then(()=>{
            setModal(null)
        })

        if(!call){
            setModal(null)
            return;
        }

        //call to invoke useEffect to call for updated userCourses
        setter();
        
    }

    const deleteHandler = (e)=>{
        e.stopPropagation();
        //call confirmation modal
        setModal({
            head:`Are you sure you want to delete course-> ${course.courseName}`,
            para:"The course will be deleted permanently",
            btn1Handler: ()=> deleteProcessor(),
            btn2Handler:()=> setModal(null),
        })
 
    }

    const editHandler = ()=>{

    }



  return (
    <div className=' w-5/6 flex flex-row justify-between text-richblack-200 text-xs
     font-semibold mx-auto bg-richblack-800 px-3 py-4 rounded-lg 
     hover:scale-105 hover:cursor-pointer transition-all duration-500'>

        <div className=' w-[40%] flex flex-row gap-x-3'>
            <img src={course.thumbnail} alt='thumbnail' className=' w-[40%] rounded-md'/>
            <div className=' flex flex-col gap-y-2 justify-evenly '>
                <h2 className=' text-richblack-5 text-lg'>{course.courseName}</h2>
                <p >{course.courseDescription}</p>
                <p>Created: April 23 </p>

                <div className={`rounded-xl
                   ${course.status === COURSE_STATUS.PUBLISHED ? `text-yellow-50`:` text-pink-200`}
                  text-xs hover:scale-105 hover:cursor-pointer
                 bg-richblack-700 w-fit px-2 py-1`}>
                    {course.status}
                </div>
            </div>
        </div>

        <div className=' w-[20%] flex flex-row justify-end items-center  gap-x-4 mr-2'>

            <div className=' w-[50px]'>20h 10m</div>
            <div className=' w-[50px] flex flex-row items-start justify-start'>
             <BsCurrencyRupee/>
             {course.price} 
            </div>
            <div className='  w-[50px] flex flex-row gap-x-2 text-xl hover:cursor-pointer'> {/*actions*/}
                <div className='hover:scale-125' onClick={()=>editHandler()}> <AiOutlineEdit /> </div>
                <div className='hover:scale-125' onClick={(e)=>deleteHandler(e)}> <AiOutlineDelete/> </div>
            </div>

        </div>




    </div>
        

  )
}



export default CourseCard