import React from 'react'

const ConfirmationModal = ({data}) => {

  return (
    <div className=' fixed inset-0 !mt-0
            bg-white bg-opacity-10 backdrop-blur-sm 
            flex justify-center items-center m-auto z-[1000]'>

                <div className=' w-fit rounded-lg border border-richblack-400
                 bg-richblack-800 p-10  gap-4 px-12
                 flex flex-col justify-center items-center'>

                    <h3 className=' text-richblack-5 
                    text-3xl font-bold'>{data.head}</h3>
                    <p className='text-richblack-300 font-semibold'>{data.para}</p>
                    <div className=' flex gap-x-3'>
                        <button onClick={data.btn1Handler}
                            className=' bg-yellow-50 font-semibold text-center
                            hover:scale-105 transition-all duration-200 rounded-md
                             text-richblack-900 w-fit px-3 py-1'
                        >Yes</button>
                        <button
                            className=' bg-richblack-400 font-semibold text-center
                            hover:scale-105 transition-all duration-200 rounded-md
                             text-richblack-900 w-fit px-3 py-1'
                        onClick={data.btn2Handler}>Cancel</button>
                    </div>
                </div>

            </div>
  )
}

export default ConfirmationModal