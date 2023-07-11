import React from 'react'

const statsData = [
    {
        number:"5K",
        desc:"Active Students"
    },
    {
        number:"10+",
        desc:"Mentors"
    },
    {
        number:"200+",
        desc:"Courses"
    },
    {
        number:"50+",
        desc:"Awards"
    },
]

const Stats = () => {
  return (
    <div className=' w-11/12 flex flex-row items-center justify-evenly
     m-auto px-2 py-8 mt-8 '>

        {
            statsData.map( (data,index)=>{
                return(<div className=' w-[10%] flex flex-col 
                    justify-center items-center text-center ' key={index}>

                        <p className=' text-richblack-5 font-bold text-xl'>{data.number}</p>
                        <p className=' text-richblack-500 text-xs '>{data.desc}</p>

                </div>)
            })
        }

    </div>
  )
}

export default Stats