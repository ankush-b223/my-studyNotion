import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authApi';


const ForgotPassword = () => {

    const {register,handleSubmit,} = useForm();

    const dispatch = useDispatch();

    const submitHandler = (data)=>{
        setEmail(data.email);
        console.log("email in form" ,data);
        dispatch(resetPassword(data.email))
        setEmailForm(false)
    }

    const resendHandler = ()=>{
        if(email !==""){
            dispatch(resetPassword(email)) //email state used
        }else{
            setEmailForm(true);
        }

    }

    const [emailForm, setEmailForm] = useState(true);
    //to retain data after mail sent for resending the email
    const [email, setEmail] = useState("");

  return (
    <div className='flex flex-col justify-center items-center m-auto
     text-richblack-5 p-2 gap-4 w-11/12'>

        <h2 className=' text-2xl font-bold w-[40%] items-start' >{
                emailForm ? "Reset Password" : "Check your email"
            }
        </h2>

        <p className=' w-[40%] text-richblack-100'>
            {
                emailForm ? `Have no fear. We’ll email you instructions to reset your password.
                 If you dont have access to your email we can try account recovery` 
                 :
                 `Have no fear. We’ll email you instructions to reset your password. 
                 If you dont have access to your email we can try account recovery`
            }
        </p>

        {
            emailForm ? (<form onSubmit={handleSubmit(submitHandler)} 
             className=' flex flex-col justify-start gap-4 items-start w-[40%]'>
                <label className='flex flex-col w-[100%] gap-2'> Email address
                    <input type='email' name='email' placeholder='Enter email' 
                     className=' bg-richblack-800 
                     px-4 py-2 rounded-lg ' {...register("email")} />

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
             text-richblue-900' onClick={resendHandler}>Resend email</button>)
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

export default ForgotPassword