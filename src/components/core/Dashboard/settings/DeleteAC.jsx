import React from 'react'
import {RiDeleteBin6Line} from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile } from '../../../../services/operations/settingsApi';
import { useNavigate } from 'react-router-dom';


const DeleteAC = () => {

    const {token} = useSelector((state)=>state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const deleteHandler =()=>{
        console.log("Delete initiated");
        dispatch(deleteProfile(token,navigate))
    }

  return (
    <div className=' relative mt-10 bg-pink-800
     hover:bg-pink-900 w-5/6 rounded-md flex flex-row
      justify-start items-start p-6 mb-10 gap-x-4 transition-all duration-200
       pb-10 '>
        
        <div className=' rounded-full p-2 bg-pink-600 text-richblack-25 
        hover:scale-105 hover:bg-richblack-25 hover:text-pink-600 
        transition-all duration-200'>
            <RiDeleteBin6Line/>
        </div>

        <div className=' flex flex-col gap-3 w-2/3 '>
            <h2 className=' text-pink-5 text-lg'>Delete Account</h2>
            <p className=' text-pink-25 text-sm'>Would you like to delete account?</p>
            <p className=' text-pink-25 text-sm'>This account may contain Paid Courses. 
                Deleting your account will remove all the 
                contains associated with it.</p>

            <button onClick={deleteHandler} className=' absolute right-9 bottom-4 rounded-lg p-2 bg-pink-600
             text-richblack-25 w-fit px-4 py-2 font-semibold text-lg
        hover:scale-105 hover:bg-richblack-25 hover:text-pink-600 
        transition-all duration-200 '>Delete</button>
        </div>


    </div>  
  )
}

export default DeleteAC