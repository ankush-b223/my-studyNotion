import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googlelogin, login } from '../../../services/operations/authApi';

import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';



const LoginForm = () => {

  const {register,handleSubmit,reset} = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [viewPassword, setViewPassword] = useState(false);

  const submitHandler = (data)=>{
    console.log("Login-Form data -> " ,data);

    dispatch(login(data.email,data.password,navigate));

    reset();
  }

  function handleGoogleLoginSuccess(tokenResponse) {

    //const accessToken = tokenResponse.access_token;
    console.log("Response from google sign in -> ",tokenResponse?.access_token);
    dispatch(googlelogin(tokenResponse,navigate));
  }

const GoogleLogin = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});

  return (
    <div className='flex flex-col justify-center items-start text-richblack-5
     text-xs gap-3 w-[100%] m-auto relative'>

      <form className='w-[100%] ' onSubmit={handleSubmit(submitHandler)}>

        <div className='flex flex-col justify-start items-start gap-1 mt-6' >

          <label className='flex justify-center items-center
           gap-1'>Email Address
            <p className='text-pink-500 text-base'>*</p>
          </label>

          <input placeholder='Enter Email'
           className=' bg-richblack-800 text-richblack-200
            px-3  py-3 rounded-md mb-5 w-[60%]' name='email' type='email' {...register("email")} />

        </div>

        <div className='flex flex-col justify-start items-start gap-1 w-[100%] m-auto'>

          <label className='flex justify-center items-center
           gap-1'>Password
            <p className='text-pink-500 text-base'>*</p>
          </label>

          <input placeholder='Enter Password'
           className=' relative bg-richblack-800 text-richblack-200
            px-3 py-3 rounded-md mb-4 w-[60%]' type={`${viewPassword ? "text":"password"}`} name='password' {...register("password")}/>

            <span onClick={()=>{
              setViewPassword(!viewPassword)
            }} className=' text-yellow-50 hover:text-richblack-200 hover:cursor-pointer 
            absolute left-64  right-20 translate-x-12 translate-y-10 text-lg'>
              {
                viewPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>
              }
            </span>

        </div>

        <button type='submit' className=' bg-yellow-50 text-black mt-8
        rounded-md  p-3 py-3 px-6 font-semibold 
        hover:scale-105 transition-all duration-200 w-[60%] '>Sign in</button>
        
        <Link to="/forgot-password" className=' w-[60%] flex justify-end pt-4 hover:scale-105 text-blue-100 
         hover:text-yellow-50 transition-all duration-200'
        >

          <div>
            Forgot Password?
          </div>

        </Link>

      </form>

      <div className=' text-richblack-5 absolute right-96 -translate-x-1 text-xs bottom-16 translate-y-1'>
         OR</div>

      <button  onClick={()=>GoogleLogin()}
      className=' bg-yellow-50 text-black mt-8
        rounded-md py-3 px-5 font-semibold flex flex-row items-center gap-x-2 justify-center
        hover:scale-105 transition-all duration-200 w-[60%] '> 
          <FcGoogle className='text-lg'/>
          <p>
            Sign in with Google
          </p>
        </button>

    </div>
  )
}

export default LoginForm