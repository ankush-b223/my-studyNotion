import React from 'react'
import image from"../assets/Images/signup.webp";
import Template from '../components/core/Auth/Template';
import HighlightText from '../components/core/Home/HighlightText';

const Signup = () => {
  return (
    <div className=' m-auto w-11/12 flex flex-row justify-center items-center
    gap-6 p-4'>

       <Template heading={`Join the millions learning to code
        with StudyNotion for free`}
        
        description={
           <div>Build skills for today, tomorrow, and beyond.
               <HighlightText text={"Education to future-proof your career."}/>
           </div>} 
       formType={"signup"}
       image={image}
       />

   </div>
  )
}

export default Signup