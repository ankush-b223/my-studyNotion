import React, {  useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { AiOutlineCaretDown } from "react-icons/ai"

import { logout } from '../../services/operations/authApi';
import useOnOutsideClick from '../../hooks/useOnOutsideClick';



export default function ProfileNav() {

    const {user} = useSelector((state)=>state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    //has ref profileDropdown
    const ref = useRef(null);

    useOnOutsideClick(ref, ()=>{
      setOpen(false);
    })


    //attaching hook to look for events outside current ref(drpdwn) => remove dropdown
   

    if (!user) return null


  return (

    <button className="relative" onClick={() => setOpen(true)}>

      <div className="flex items-center gap-x-1">

        <img
         src={user.image}
         alt={`profile-${user?.firstName}`}
         className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-xs text-richblack-100" />

      </div>

       

        {
          open && (

            <div onClick={(e)=>e.stopPropagation()}
                className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] 
                   divide-richblack-700 overflow-hidden
                   rounded-md border-[1px] 
                   border-richblack-700 bg-richblack-800"
                ref={ref}
            >

              <Link to="/dashboard/my-profile" onClick={()=>setOpen(false)}>

                <div className="flex w-full items-center gap-x-1 py-[10px]
                  px-[12px] text-sm text-richblack-100 hover:bg-richblack-700
                 hover:text-richblack-25 hover:scale-105 transition-all duration-200">

                  <VscDashboard className="text-lg"/>
                  Dashboard                  
                </div>

              </Link>

              <div onClick={ ()=>{
                dispatch(logout(navigate))
                setOpen(false)
              }}  className="flex w-full items-center gap-x-1 py-[10px] 
              px-[12px] text-sm text-richblack-100
               hover:bg-pink-500 hover:text-richblack-25 group transition-all duration-200"
              >
              <VscSignOut  className="text-lg text-pink-500 hover:text-richblack-25
               group-hover:text-richblack-25 group-hover:scale-105
              transition-all duration-200 "/> 
                Logout
              </div>

            </div>
          )
        }
      

    </button>
  )
}

// export default ProfileNav