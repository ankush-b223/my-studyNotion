import React from 'react'
import Template from '../components/core/Auth/Template';

import image from "../assets/Images/login.webp";
import HighlightText from '../components/core/Home/HighlightText';

const Login = () => {
  return (
    <div className=' m-auto w-11/12 flex flex-row justify-center items-center
     gap-6 p-4'>

        <Template heading={"Welcome Back"}
         description={
            <div>Build skills for today, tomorrow, and beyond.
                <HighlightText text={"Education to future-proof your career."}/>
            </div>} 
        formType={"login"}
        image={image}
        />

    </div>
  )
}

export default Login