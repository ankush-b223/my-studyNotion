import React from 'react'
import RenderSteps from './RenderSteps'
import CourseInformation from './CourseInformation';
import CourseBuilder from './CourseBuilder';
import Publish from './Publish';
import { useSelector } from 'react-redux';

const AddCourse = () => {
    
    const {step} = useSelector((state)=>state.course);


  return (
    <div className=' text-richblack-5 flex flx-row w-11/12 
    justify-between items-start mt-10 mx-auto'>

        <div className=' flex flex-col justify-start items-start gap-y-4 w-[50%] mx-auto'>

            <div className=' w-[100%]'>

                <RenderSteps/>

            </div>

            <div className=' w-[100%]'>

                {/* { step wise form section} */}
                {step === 1 && <CourseInformation/>}

                {step === 2 && <CourseBuilder/>}

                {step === 3 && <Publish/>}

            </div>      


        </div>

        <div className=' gap-y-3 bg-richblack-800 flex flex-col w-[35%] px-6 py-4 rounded-md 
        hover:scale-105 transition-all duration-200 mr-8'>

            <h2 className=' font-bold text-lg'>Course Upload Tips</h2>
            <ul className=' text-xs gap-y-1 list-disc flex flex-col w-11/12'>
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>

            </ul>
        </div>
        
       


    </div>
  )
}

export default AddCourse