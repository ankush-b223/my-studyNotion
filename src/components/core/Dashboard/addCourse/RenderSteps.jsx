import React from 'react'
import { useSelector } from 'react-redux'
import {MdDone} from "react-icons/md"

const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
]

const RenderSteps = () => {

    const {step} = useSelector((state)=>state.course);

  return (

    <div className=' flex flex-col gap-y-2'>

        <div className=' flex flex-row w-11/12 gap-x-32  justify-center items-center'>
            {
                steps.map((stepOp)=>{
                    return(
                        <div key={stepOp.id} className={`grid cursor-default aspect-square w-[40px]
                        place-items-center rounded-full border-[1px] ${stepOp.id === step ? 
                            "border-yellow-50 bg-yellow-900 text-yellow-50":
                            "border-richblack-700 bg-richblack-800 text-richblack-300"} 
                        w-[10%] py-2  text-center hover:scale-105`}>
                            { step> stepOp.id ? 
                            <MdDone className="font-bold text-yellow-50 "/> 
                            : stepOp.id}
                        </div>
                    )
                })
            }
        </div>

        <div className=' flex flex-row w-11/12 gap-x-32 justify-center items-center text-xs'>

            {
                steps.map((stepOp)=>{
                    return(
                        <div key={stepOp.id} className={` rounded-full 
                             text-richblack-5 
                        w-[10%] py-2  text-center hover:scale-105`}>
                            {stepOp.title}
                        </div>
                    )
                })
            }

        </div>

    </div>

   
  )
}

export default RenderSteps