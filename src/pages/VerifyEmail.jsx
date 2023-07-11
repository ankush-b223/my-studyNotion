import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { sendOtp, signup } from '../services/operations/authApi';

const VerifyEmail = () => {

    const {signupData} = useSelector((state)=>state.auth);

    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const resendOtpHandler = (e)=>{
        e.preventDefault();
        dispatch(sendOtp(signupData.email,navigate))//resend otp call
    }

    const submitHandler =(e)=>{
        e.preventDefault();

        console.log("signupData stored-> " , signupData);

        const fullData = {
            ...signupData,otp
        }
        console.log("Data sent to BE with otp",fullData);
        dispatch(signup(fullData.firstName ,fullData.lastName,fullData.email,fullData.password , fullData.confirmPassword,
            fullData.contactNumber , fullData.accountType , otp,navigate));



    }

    if(signupData === null){
        return <Navigate to="/signup"/>
    }

  return (
    <form className=' w-11/12 flex flex-col justify-center
     items-center m-auto gap-4 text-richblack-5 ' onSubmit={submitHandler}>

            <h2 className=' text-2xl font-semibold'>Verify email</h2>
            <p className=' text-richblack-100 w-[30%] text-center'>A verification code has been sent to you.
                Enter the code below
            </p>

            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>&nbsp;&nbsp;&nbsp;</span>}
                renderInput={ (props)=> (
                <input
                {...props}
                placeholder='_'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                className=' bg-richblack-800 rounded-md w-[48px] lg:w-[60px]
                  text-richblack-5 text-center aspect-square focus:border-0
                 focus:outline-2 focus:outline-richblack-5
                gap-6' /> 
                )
                }
                
            />

            <button className=' bg-yellow-50 py-2 px-10 rounded-lg 
            text-center font-semibold w-[38%] hover:scale-105 text-richblack-900' 
            type='submit'>Verify email</button>

            <div className=' flex flex-row justify-between
             items-center w-[38%]'>
                <Link to='/signup' className=' hover:scale-105 hover:text-yellow-50'>
                    <div>
                        Back to signup
                    </div>
                </Link>

                <button onClick={resendOtpHandler} className=' hover:scale-105
                 hover:text-yellow-50'>Resend it</button>
            </div>


        



    </form>
  )
}

export default VerifyEmail