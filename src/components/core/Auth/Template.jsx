import React from 'react';
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Template = ({heading , description , formType , image}) => {
  return (
    <div className='flex flex-row py-3'>

        <div className=' flex flex-col gap-3 w-[50%] max-w-maxContent 
         items-start justify-center'>
            <p className=' text-richblack-5 
            text-2xl font-bold w-[80%]'>{heading}</p>
            <div className=' text-richblack-100
            w-[70%] font-sm'>{description}</div>
            <div className='w-[100%]'>
            {
                formType === "login" ? <LoginForm/> : <SignupForm/>
            }
            </div>
           
            
        </div>

        <div className=' w-[50%]'>
            <img src={image} alt='pic'/>
        </div>

    </div>
  )
}

export default Template