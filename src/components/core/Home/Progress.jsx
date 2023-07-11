import React from 'react'
import HighlightText from './HighlightText'

import img1 from "../../../assets/Images/Know_your_progress.png";
import img2 from "../../../assets/Images/Compare_with_others.png";
import img3 from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from './CTAButton';



const Progress = () => {
  return (
    <div className='w-11/12 mt-10 py-10 flex flex-col
     justify-center items-center m-auto'>

        <div className='flex flex-col justify-center
        items-center m-auto gap-4 text-center w-[60%]'>
            <p className=' text-richblack-900 
            text-center font-semibold text-3xl'>Your swiss knife for 
            <HighlightText text={" learning any language"}/>
            </p>
            <p className=' text-sm font-semibold text-richblack-700  '>Using spin making learning multiple languages easy.
                with 20+ languages 
                realistic voice-over, progress tracking, 
                custom schedule and more.</p>
        </div>

        <div className=' mt-3 relative flex flex-row w-[75%] 
        justify-evenly items-center object-contain mb-10'>
            <img src={img1} alt='prop' className=' w-[35%]' />
            <img src={img2} alt='prop' className=' w-[35%]' />
            <img src={img3} alt='prop' className=' w-[35%]' />

        </div>

        <CTAButton active={true} link={"/login"}>
            Learn More
        </CTAButton>

    </div>
  )
}

export default Progress