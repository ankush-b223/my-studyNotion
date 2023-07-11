import React from 'react'

import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

import timeline from "../../../assets/Images/TimelineImage.png"

const points = [

    {
        logo:logo1,
        heading:"Leadership",
        para:"Fully committed to the success company"
    },
    {
        logo:logo2,
        heading:"Responsibility",
        para:"Students will always be our top priority"
    },    {
        logo:logo3,
        heading:"Flexibility",
        para:"The ability to switch is an important skills"
    },
    {
        logo:logo4,
        heading:"Solve the problem",
        para:"Code your way to a solution"
    },
]

const Principles = () => {
  return (
    <div className='w-11/12 gap-10 m-auto flex flex-row 
    justify-center items-center mt-6 py-6'>
        <div className='w-[40%}'>
            {
                points.map( (point,index) =>{
                    return(
                        <div className='flex flex-row gap-12 py-5'
                         key={index}>

                            <img src={point.logo} alt='logo'/>
                            <div className='flex flex-col
                             items-start'>
                                <p className='text-xl
                                 font-bold text-richblack-800'>{point.heading}</p>
                                <p className='text-richblack-700'>{point.para}</p>
                            </div>

                        </div>
                    )
                })
            }
        </div>

        <div className=' relative w-[55%] py-12 '>
            <img src={timeline} alt='timeline'></img>
            <div className=' absolute bg-caribbeangreen-700 
            w-[75%] h-[15%]  flex flex-row gap-5 
            left-20 translate-x-1 -translate-y-14 rounded-md '>

                <div className='flex flex-row gap-2
                 items-center justify-evenly 
                   text-xs text-caribbeangreen-300 
                   font-semibold w-[50%] border-r-2 border-white border-'>
                    <p className='text-3xl text-white font-bold'>10</p>
                    <p>YEARS<br/> EXPERIENCES</p>
                </div>
                <div className='flex flex-row gap-2
                 items-center justify-evenly 
                   text-xs text-caribbeangreen-300 
                   font-semibold w-[50%]'>
                    <p className='text-3xl text-white font-bold'>250</p>
                    <p>TYPES OF<br/> COURSES</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Principles