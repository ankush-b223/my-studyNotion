import React ,{useState} from 'react';
import AccountTab from "./AccountTab";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../../../slices/authSlice';
import { sendOtp, signupGoogle } from '../../../services/operations/authApi';
import { useNavigate } from 'react-router-dom';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";

import {ACCOUNT_TYPE} from "../../../utilities/constants";


import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';


const SignupForm = () => {

  const {register, handleSubmit , reset}  = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setConfirmViewPassword] = useState(false);




  const submitHandler = (data)=>{

    let fullData = {
      ...data,accountType
    }
     dispatch(setSignupData(fullData));
    dispatch(sendOtp(data.email , navigate))
    console.log("signup data from form-> ",fullData);
    reset()
  }



  const googleSignUpSuccess = (jwt)=>{
    const result = jwtDecode(jwt);

    const signUpData = {
      email:result?.email,
      lastName:result?.family_name,
      firstName:result?.given_name,
      iss:"https://accounts.google.com",
      image:result?.picture,
      contactNumber: result?.phone_number ? result?.phone_number : null,

    };

    console.log("Resultant Data-> " , signUpData);

    //call service
    dispatch(signupGoogle(signUpData,navigate))

  }

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]


  return (

    <div className='flex flex-col justify-center items-start text-richblack-5
     text-xs gap-3 gap-y-12 w-[100%] m-auto relative'>

      <AccountTab tabData={tabData}
       field={accountType} setField={setAccountType}/>

      <form className=' w-[80%]' onSubmit={handleSubmit(submitHandler)}>

        <div className=' w-[100%] flex flex-row gap-3 ' >

          <div className='w-[50%]'>
            <label className='flex gap-1'>First Name
            <p className='text-pink-500 text-base'>*</p>
            </label>
            <input placeholder='Enter first name'
             className=' bg-richblack-800 text-richblack-200
            px-3 py-3 rounded-md mb-4 w-[100%]' type='text' name='firstName' {...register("firstName")} />
          </div>

          <div className='w-[50%]'>
            <label className='flex gap-1'>Last Name
              <p className='text-pink-500 text-base'>*</p>
            </label>
            <input placeholder='Enter last name'
             className=' bg-richblack-800 text-richblack-200
            px-3 py-3 rounded-md mb-4 w-[100%]' type='text' name='lastName' {...register("lastName")} />
          </div>

        </div>

        <div className='flex flex-col justify-start items-start gap-1 w-[100%] m-auto'>

          <label className='flex justify-center items-center
           gap-1'>Email Address
            <p className='text-pink-500 text-base'>*</p>
          </label>

          <input placeholder='Enter Email'
           className=' bg-richblack-800 text-richblack-200
            px-3 py-3 rounded-md mb-4 w-[100%]' type='email' name='email' {...register("email")}/>

        </div>
        

        <div>

          <label>Phone Number</label>
          <div className=' w-[100%] flex flex-row gap-14 '>
              <div className='w-[16%]'>
                <input className=' mt-2 bg-richblack-800 text-richblack-200
                px-3 py-3 rounded-md mb-4 w-[100%]'/>
              </div>
            <div className=' w-[80%] -ml-10'>
              <input className=' mt-2 bg-richblack-800 text-richblack-200
              px-3 py-3 rounded-md mb-4 w-[100%]'  type='number' placeholder='Enter contact number'
              name='contactNumber' {...register("contactNumber")}/>
            </div>
          </div>
          
        </div>

        <div className=' w-[100%] flex flex-row gap-3'>
          <div className=' w-[50%]'>
            <label className='flex gap-1'>
              Password  <p className='text-pink-500 text-base'>*</p>
            </label>
            <div> 
              <input placeholder='Enter password' className=' relative bg-richblack-800 text-richblack-200
            px-3 py-3 rounded-md mb-4 w-[100%]'
            type={`${viewPassword ? "text":"password"}`} name='password' {...register("password")}/>

            <span onClick={()=>{
              setViewPassword(!viewPassword)
            }} className=' text-yellow-50 hover:text-richblack-200 hover:cursor-pointer
             absolute left-26 -translate-x-7 translate-y-3 text-lg'>
              {
                viewPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>
              }
            </span>

            </div>

           

          </div>
          
          <div className=' w-[50%]'>
            <label className='flex gap-1'>
              Confirm Password  <p className='text-pink-500 text-base'>*</p>
            </label>
            <div> 
              <input placeholder='Enter password' className=' bg-richblack-800 text-richblack-200
                px-3 py-3 rounded-md mb-4 w-[100%]'
                type={`${viewConfirmPassword ? "text":"password"}`}
                name='confirmPassword' {...register("confirmPassword")}
              />

            <span onClick={()=>{
              setConfirmViewPassword(!viewConfirmPassword)
            }} className=' text-yellow-50 hover:text-richblack-200 hover:cursor-pointer
             absolute  -translate-x-8 translate-y-3 text-lg'>
              {
                viewConfirmPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>
              }
            </span>

            </div>
          </div>
          
        </div>

        <button type='submit' className=' bg-yellow-50 text-black mt-8
        rounded-md  p-3 py-3 px-6 font-semibold
        hover:scale-105 transition-all duration-200 w-[100%] '>Create Account</button>

      </form>

      <div className=' text-richblack-5 absolute right-80 -translate-x-3 text-xs bottom-16 translate-y-2 '> OR</div>

      <GoogleLogin
        onSuccess={(res)=>googleSignUpSuccess(res?.credential)}
        onError={(err)=>console.log("Err in google sign up",err)}
        
      />

  </div>

  )
}

export default SignupForm