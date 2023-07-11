import React from 'react'
import {HiCurrencyRupee} from "react-icons/hi"
import { Link } from 'react-router-dom'

const CARD_COURSE = ({data}) => {

  console.log("instructor name -> " , data?.instructor?.firstName);

  return ( //will replace div with link for single course page
    <Link to={`/course/${data._id}`} className='  flex flex-col justify-start items-start 
      rounded-md px-1 py-3 text-xs text-richblack-200 gap-y-1 
      hover:scale-105 hover:cursor-pointer transition-all duration-500 mr-0 '>

      <img src={data?.thumbnail}  className=' rounded-md h-[230px] w-[300px]' alt='thumbnail'/>
      <div className=' flex flex-col  gap-y-1 '>
        <h2 className='text-richblack-5 font-semibold text-lg'>{data.courseName}</h2>
        <p className=' '> By <span>{data?.instructor?.firstName} </span></p>
        {/* rating */}
        <p className=' flex flex-row justify-start items-center gap-x-0.5 text-richblack-100 text-sm'>
           <HiCurrencyRupee/> {data.price}</p>
      </div>

    </Link>
  )
}

export default CARD_COURSE