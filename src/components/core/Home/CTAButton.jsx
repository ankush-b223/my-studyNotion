import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children , active , link}) => {
  return (
    <Link to={link}>
        <div className={` rounded-md font-semibold p-3 py-3 px-6
         ${active ? 
         "bg-yellow-50 text-black" :
          "bg-richblack-800 text-white"}
           hover:scale-105 transition-all duration-200 `}>
            {children}
        </div>
    </Link>
    
  )
}

export default CTAButton