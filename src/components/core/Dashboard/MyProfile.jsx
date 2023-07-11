import React from 'react'
import { useSelector } from 'react-redux'

import {VscEdit} from "react-icons/vsc"
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {

  const {user} = useSelector((state)=>state.profile);
  const navigate = useNavigate();

  console.log("user-> ",user);

  return (
    <div className=' mt-10 text-richblack-5  flex flex-col justify-center
     gap-8 items-center m-auto w-[100%]'>

        <div className=' flex flex-row items-center justify-between mx-auto
         bg-richblack-800 w-[80%] py-8 px- p-3 rounded-lg'>


        <div className=' flex flex-row items-center justify-start gap-5 '>

          <img src={user?.image} alt='dp' className=' object-cover aspect-square rounded-full w-[10%]'/>
          <div className=' flex flex-col justify-center items-start'>
            <div className=' flex flex-row gap-1'>

              <p className=' text-richblack-5 text-lg font-semibold'>{user?.firstName} { }</p>
              <p className='text-richblack-5 text-lg font-semibold '>{user?.lastName}</p>

            </div>
            <p className='text-richblack-300 text-sm font-semibold'>{user?.email}</p>
          </div>

        </div>
        
        <button onClick={()=>{
          navigate("/dashboard/settings")
        }} className=' flex flex-row
         w-fit bg-yellow-50 text-richblack-900
          justify-center items-center gap-1 rounded-lg py-1 px-3
           hover:scale-105 transition-all duration-300 font-semibold'>
            <VscEdit className=' text-lg '/>Edit</button>

      </div>

      <div className=' flex flex-col justify-between items-baseline m-auto w-[80%]
       bg-richblack-800 rounded-lg py-5 px-4 gap-3'>

        <div className=' flex flex-row justify-between items-center w-[100%]'>
          <p className=' text-richblack-5 font-semibold'>Personal Details</p>
          <button onClick={()=>{
            navigate("/dashboard/settings")
            }} className=' flex flex-row
              w-fit bg-yellow-50 text-richblack-900
              justify-center items-center gap-1 rounded-lg py-1 px-3
              hover:scale-105 transition-all duration-300
               font-semibold'>
                <VscEdit className=' text-lg '/>Edit</button>
          </div>

        <div className=' flex flex-row justify-between items-center w-[70%]'>
          
          <div className=' flex flex-col items-start justify-center gap-2'>
            <h2 className=' text-richblack-600 text-xs'>First Name</h2>
            <p className=' text-richblack-5 text-sm font-semibold'>{user?.firstName}</p>
          </div>
          <div className='  flex flex-col items-start justify-center gap-2 '>
            <h2 className=' text-richblack-600 text-xs'>Last Name</h2>
            <p className=' text-richblack-5 text-sm font-semibold'>{user?.lastName} </p>
          </div>

        </div>

        <div className=' flex flex-row justify-between items-center w-[70%]'>
          
          <div className=' flex flex-col items-start justify-center gap-2'>
            <h2 className=' text-richblack-600 text-xs'>Email</h2>
            <p className=' text-richblack-5 text-sm font-semibold'>{user?.email}</p>
          </div>
          <div className=' flex flex-col items-start justify-center gap-2'>
            <h2 className=' text-richblack-600 text-xs'>Phone Number</h2>
            <p className=' text-richblack-5 text-sm font-semibold'>{user?.additionalDetails?.contactNumber} </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default MyProfile