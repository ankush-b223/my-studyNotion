import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";


import Spinner from '../components/common/Spinner';
import { updatePassword } from '../services/operations/authApi';

const UpdatePassword = () => {

  const [updating, setUpdating] = useState(true);
  const [loading, setLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setConfirmViewPassword] = useState(false);
  
  const navigate = useNavigate();

  const loc = useLocation();
  const path = loc.pathname.split("/");
  const token = path[path.length-1];
  console.log("token of url -> "  ,token);



  const {register,handleSubmit} = useForm();
  const dispatch = useDispatch();

  const submitHandler = (data)=>{
    setLoading(true);
    dispatch(updatePassword(data.newPassword,token,navigate));
    setUpdating(false);
    setLoading(false);

  }


  return (
    <div className=' flex flex-col justify-center items-center 
    w-11/12 text-richblack-5 m-auto gap-4'>

      {
        loading ? (<Spinner></Spinner>):(
          <div className='flex flex-col justify-center items-center 
          w-11/12 text-richblack-5 m-auto gap-4'>



            <h2 className=' text-2xl font-bold w-[40%] items-start'>
              {
                updating ? ("Choose new password")
                :
                ("Reset Complete")
              }
            </h2>

            <p className=' text-richblack-100 w-[40%] '>
              {
                updating ? (`Almost done. Enter your 
                new password and you're all set.`)
                :
                (`All done! Hop back in`)
              }
            </p>

            {
              updating ? (<form className=' w-[40%] flex flex-col gap-4 ' 
              onSubmit={handleSubmit(submitHandler)}>

                  <label className=' relative w-[100%] flex flex-col gap-1'>
                    New password
                    <input className=' bg-richblack-800 
                          px-4 py-2 rounded-lg ' 
                          type={`${viewPassword ? "text":"password"}`}
                           name='newPassword' 
                           {...register("newPassword")}/>

                    <span onClick={()=>{
                      setViewPassword(!viewPassword)
                    }} className=' text-yellow-50
                     hover:text-richblack-200 hover:cursor-pointer
                    absolute right-5 translate-y-10 text-lg'>
                      {
                        viewPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>
                      }
                    </span>
                  </label>

                  <label className=' relative w-[100%] flex flex-col gap-1'>
                    Confirm new password 
                    <input className=' bg-richblack-800 
                          px-4 py-2 rounded-lg ' name='confirmNewPassword' 
                          type={`${viewConfirmPassword ? "text":"password"}`}
                    {...register("confirmNewPassword")}/>
                        <span onClick={()=>{
                          setConfirmViewPassword(!viewConfirmPassword)
                          }} className=' text-yellow-50
                           hover:text-richblack-200 hover:cursor-pointer
                          absolute  right-5 translate-y-10 text-lg'>
                          { ////add confirm password validation
                            viewConfirmPassword ?
                             <AiOutlineEye/> : <AiOutlineEyeInvisible/>
                          }
                        </span>
                  </label>

                  <button className=' bg-yellow-50 w-[100%]
                      font-semibold px-2 py-2 rounded-lg
                      hover:scale-105 transition-all duration-200
                        text-richblue-900' type='submit'>Reset Password</button>

              </form>)
              :
              (<button className=' bg-yellow-50 w-[40%]
              font-semibold px-2 py-2 rounded-lg
              hover:scale-105 transition-all duration-200
              text-richblue-900' onClick={()=>{
                navigate("/login")
              }}>Back to Login</button>)
            }

                  <Link to='/login' className=' items-start w-[40%] mt-2
                  font-semibold hover:scale-105 transition-all duration-200 hover:text-yellow-50'>
                      <div>
                          Back to login
                      </div>
                  </Link>




          </div>
        )
      }

      


    </div>
  )
}

export default UpdatePassword