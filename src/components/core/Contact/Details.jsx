import React from 'react';
import * as AiIcons from 'react-icons/ai';

const details = [

    {
        icon:"AiFillWechat",
        head:"Chat with us",
        desc:"Our friendly team is here to help."
    },
    {
        icon:"AiOutlineGlobal",
        head:"Visit us",
        desc:"Come and say hello at our office HQ. Here is the location/ address"
    }, {
        icon:"AiFillPhone",
        head:"Call us",
        desc:"Mon - Fri From 8am to 5pm. +123 456 7890"
    },
]

const Details = () => {
  return (
    <div className=' mt-40 flex flex-col gap-8
     bg-richblack-800 text-richblack-200 p-12 rounded-md border border-solid
       border-richblack-200 hover:scale-110 transition-all duration-500 
        hover:border-richblack-5 cursor-pointer '>

        {
            details.map((obj,index)=>{
                const Icon = AiIcons[obj.icon];
                // console.log("eval of obj icon->" , icon);
                return(
                    <div key={index} className=' flex flex-row
                     justify-start items-center gap-3'>
                        <div className=''>
                            {
                                Icon && <Icon/>
                            }
                        </div>
                        <div className=' flex flex-col'>
                            <header className=' text-lg font-semibold
                             text-richblack-5'>{obj.head}</header>
                            <p className=' text-sm font-semibold'>{obj.desc}</p>    
                        </div>
                    </div>
                )
            })
        }

    </div>
  )
}

export default Details