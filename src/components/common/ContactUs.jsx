import React from 'react'
import { useForm } from 'react-hook-form'

import CountryCode from "../../data/countrycode.json";




const ContactUs = ({heading,desc}) => {

    const {register,reset,handleSubmit,
        formState:{errors,isSubmitSuccessful}} = useForm();

    const submitHandler = (data)=>{
        console.log("data from contact form ->"  ,data);

        if(isSubmitSuccessful){
            reset()
        }

    }


  return (

    <div className=' flex flex-col gap-3 
    justify-center items-center mx-auto w-11/12 mb-10 mt-20'>

        <header className=' text-richblack-5 font-bold text-2xl'>{heading}</header>

        <p className=' text-richblack-300 text-xs font-semibold
         -mt-2 mb-10'>{desc}</p>

        <form onSubmit={handleSubmit(submitHandler)} className='
         text-richblack-300 flex flex-col 
          justify-center items-center gap-3'>

            <div className=' flex flex-row justify-between items-center
            w-[80%] mx-auto'>

                <div className=' flex flex-col w-[45%] gap-1'>First Name
                    <input className=' bg-richblack-800 rounded-md py-2 px-2 text-sm'
                        type='text' name='firstName' placeholder='First name'
                        {...register("firstName",{required:true})}    
                    />
                    {
                        errors.firstName && (<span>
                            Please enter your name
                        </span>)
                    }
                </div>

                <div className=' w-[45%] flex flex-col gap-1'>Last Name
                    <input  className=' bg-richblack-800 rounded-md py-2 px-2 text-sm'
                        type='text' name='lastName' placeholder='Last Name'
                        {...register("lastName" , {required:true})}
                    />
                    {
                        errors.lastName && (<span>
                            Please enter your full name
                        </span>)
                    }
                </div>

            </div>

            <div className=' flex flex-col w-[80%] gap-1'>Email Address

                <input className=' bg-richblack-800 rounded-md py-2 px-2 text-sm'
                    type='email' name='email' placeholder='Email'
                    {...register("email" , {required:true})}
                />
                {
                    errors.firstName && (<span>
                            Please enter your email
                    </span>)
                }

            </div>

            <div className=' flex flex-row justify-between items-center
            w-[80%] mb-2 gap-1'>

                <label className=''> Phone Number
                <div className=' flex flex-row justify-between items-center '>

                    <select className=' w-[15%] bg-richblack-800 rounded-md px-2 text-sm
                     py-2'
                            name='dropdown'

                            {...register("countryCode",{required:true})}
                    >
                            {   
                                CountryCode.map( (code,index)=>{
                                    return( <option 
                                    key={index} value={code.code}> 
                                        {code.code} - {code.country}
                                    </option>)
                                })

                            }
                        </select>

                        <input className=' w-[80%] bg-richblack-800 
                         rounded-md py-2 px-2 text-sm'
                            type='number' name='contactNumber' 
                            placeholder='Phone Number'
                            {...register("contactNumber" , {required:true})}
                        />
                        {
                            errors.contactNumber &&(
                                <span>
                                    Please enter phone number
                                </span>
                            )
                        }
                        
                    </div>
                </label>
                
 

            </div>

            <div className=' flex flex-col  w-[80%] justify-center
             gap-1 items-start'>
                
                <label htmlFor='message'> Message</label>
                <textarea
                        name='message' placeholder='Enter message'
                        cols="52"
                        rows="7"
                        className=' bg-richblack-800 rounded-md py-2 px-2 text-sm'
                        {...register("message",{required:true})}

                    />
                    {
                        errors.message && (
                            <span className=''>
                                Please enter your message
                            </span>
                        )
                    }
            </div>




            <button type='submit' className=' bg-yellow-50 
            rounded-lg w-[80%] py-2 px-1 mt-4
             text-richblack-900 font-bold text-lg 
             hover:scale-105 transition-all duration-200 shadow-lg'>
                Send Message
            </button>


        </form>


    </div>
  )
}

export default ContactUs