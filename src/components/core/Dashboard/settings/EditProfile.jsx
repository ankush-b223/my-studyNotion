import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import {BiEdit} from "react-icons/bi";
import { editProfile } from '../../../../services/operations/settingsApi';
import { toast } from 'react-hot-toast';
const _ = require("lodash");

const genders = ["Male",
 "Female",
  "Non-Binary",
   "Prefer not to say",
    "Other"]


const EditProfile = () => { 

    const {token} = useSelector((state)=>state.auth);

    const {user} = useSelector((state)=>state.profile);

    const dispatch = useDispatch();
    
    const {register,handleSubmit,reset,
        formState:{errors},} = useForm();

    const submitHandler = (data)=>{//write validation whenever
        // there is a change in form then only send a call

        const checkChanges = {
            
            firstName:user?.firstName,
            lastName:user?.lastName,
            about: user?.additionalDetails?.about ? user?.additionalDetails?.about : "",
            //contact number is converted to string as form data is always in strings
            contactNumber: user?.additionalDetails?.contactNumber ?
                user?.additionalDetails?.contactNumber.toString() : "",
            dateOfBirth: user?.additionalDetails?.dateOfBirth ? user?.additionalDetails?.dateOfBirth : "",
            gender: user?.additionalDetails?.gender ? user?.additionalDetails?.gender : ""
        }

        if(_.isEqual(data,checkChanges)){
            toast.error("No updates performed");
            return;
        }

        dispatch(editProfile(token,data)).then(()=>{
            reset();
        })

    }
        
    useEffect (()=>{    

        console.log("the user object now",user);
        
    },[user])


  return (
    <div className=' text-richblack-200 bg-richblack-800 flex flex-col 
    justify-center items-center w-[84%] gap-3 px-8 p-5 m-auto rounded-lg'>

        

        <form onSubmit={handleSubmit(submitHandler)}
         className=' relative w-[100%] flex flex-col justify-start gap-6 py-4'>

            <h2 className=' -mt-2 text-lg font-bold text-richblack-5'>
                Personal Details</h2>
            
            <div className=' flex justify-between items-center
             flex-row w-11/12 mx-auto'>

                <div className=" flex flex-col gap-y-2 w-[100%] mx-auto">
                    <p className=' text-sm font-semibold text-richblack-25'>
                        First Name</p>
                    <input
                        type='text' className=' text-sm bg-richblack-700 
                        w-[60%] rounded-md
                         px-4 py-1'
                        name='firstName'
                        defaultValue={user?.firstName}
                        {...register("firstName",{required:true})}
                    />
                    {errors.firstName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your first name.
                        </span>
                    )}
                </div>

                <div className=" flex flex-col gap-y-2 w-[100%] mx-auto">
                    <p className=' text-sm font-semibold text-richblack-25'>
                         Last Name</p>
                    <input className=' bg-richblack-700 text-sm px-4 py-1
                     w-[60%] rounded-md'
                        type='text'
                        name='lastName'
                        defaultValue={user?.lastName}
                        {...register("lastName",{required:true})}
                    />
                    {errors.lastName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your first name.
                        </span>
                    )}
                </div>

            </div>

            <div className=' flex justify-between items-center m-auto
              flex-row w-11/12'>

                <div className=" flex flex-col gap-y-2 w-[100%] mx-auto">
                    <p className=' text-sm font-semibold text-richblack-25'>Date of Birth</p>
                    <input className=' bg-richblack-700 text-sm w-[60%]
                     px-4 py-1 rounded-md '
                        type='date'
                        name='dateOfBirth'
                        defaultValue={user?.additionalDetails?.dateOfBirth}
                        {...register("dateOfBirth",{
                            max: {
                              value: new Date().toISOString().split("T")[0],
                              message: "Date of Birth cannot be in the future.",
                            },
                          })}
                    />
                </div>
                <div className=" flex flex-col gap-y-2 w-[100%] mx-auto">
                    <p className=' text-sm font-semibold text-richblack-25'>Phone Number</p>
                    <input className=' bg-richblack-700 text-sm w-[60%]
                      px-4 py-1 rounded-md'
                        type='tel'
                        name='contactNumber'
                        defaultValue={user?.additionalDetails?.contactNumber}
                        {...register("contactNumber")}
                    />
                </div>
                

            </div>

            <div className=' flex justify-between items-center mx-auto 
             flex-row w-11/12'>

                <div className=" flex flex-col gap-y-2 w-[100%] mx-auto">
                    <p className=' text-sm font-semibold text-richblack-25'>Gender</p>
                    <select name='gender' 
                    className=' bg-richblack-700 text-sm px-3 w-[60%]
                     py-2 rounded-md' 
                    {...register("gender")}>
                    {
                        genders.map((gender,index)=>{
                            return(<option key={index} value={gender}>
                                {gender}
                            </option>)
                        })
                    }
                    </select>
                </div>
                <div className=" flex flex-col gap-y-2 w-[100%] mx-auto">
                    <p className=' text-sm font-semibold text-richblack-25'>About</p>
                    <input type='text' className=' text-sm bg-richblack-700
                    w-[60%] px-4 py-1 rounded-md'
                        name='about'
                        placeholder='Write about yourself'

                        defaultValue={user?.additionalDetails?.about}
                        {...register("about")}
                    />
                </div>
                
            </div>

            <div className='absolute right-2 bottom-1 -translate-x-2 mt-5'>
                <button type='submit' className=' bg-yellow-50 text-richblack-900 
                font-semibold hover:scale-105 
                 transition-all duration-200 w-fit flex items-center gap-x-1
                  px-3 py-1 rounded-lg hover:text-richblack-25 hover:bg-yellow-200'>Edit<BiEdit/></button>
            </div>



        </form>


    </div>
  )
}

export default EditProfile