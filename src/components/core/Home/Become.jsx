import React from 'react';
import instructorImg from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';
import CTAButton from './CTAButton';
import { FaArrowRight } from 'react-icons/fa';

const Become = () => {
  return (
    <div className='mt-12 mb-10 flex flex-row 
     justify-evenly items-center gap-5 '>

        <div className=' w-[50%]'>
            <img src={instructorImg} alt='instructor' className='
              w-[80%] ml-8'/>
        </div>

        <div className='flex flex-col gap-2 w-[30%] '>   
            <p className=' text-richblack-5 font-bold text-3xl'>
                Become an <br/> <HighlightText text={"Instructor"}/>
            </p>
            <p className='text-xs text-richblack-300 mb-20 '>Instructors from around the 
                world teach millions of
                 students on StudyNotion.
                 We provide the tools and 
                 skills to teach what you love.
            </p>
            <CTAButton active={true} link={"/signup"}>
                <div className=' flex flex-row gap-2 
                justify-center items-center'>
                    Start Teaching Today
                    <FaArrowRight></FaArrowRight>
                </div>
            </CTAButton>
        </div>
    </div>
  )
}

export default Become