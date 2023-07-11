import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {AiOutlineCaretDown,AiOutlineEdit,AiOutlineDelete,AiOutlinePlus} from "react-icons/ai"
import SubSectionalModal from './SubSectionalModal';


const NestedSections = () => {

    const {course}= useSelector((state)=>state.course);

    const [addLec, setAddLec] = useState(null);
    const [viewLec, setViewLec] = useState(null);
    const [editLec, setEditLec] = useState(null);

  return (
    <div className=' bg-richblack-700 text-richblack-5 w-full  p-3 rounded-md'>

        {/* Nested Section */}

        <div className=' flex flex-col gap-y-9 text-sm w-full p-2 py-3 mb-10'>
            {
                course?.courseContent.map((section,index)=>{
                    return(
                        <details key={index} open className=' relative flex flex-col gap-y-2 
                        hover:cursor-pointer hover:scale-105 transition-all duration-500'>

                            <summary className='  border-b-2 border-richblack-200 mb-2  '>
                                <div className=' flex flex-row justify-between items-center py-1 px-2
                                 transition-all duration-500'>
                                    <header className=' font-bold uppercase'>{section?.sectionName}</header>
                                    <div className=' flex flex-row justify-center items-center
                                     gap-x-1'>

                                        {/* delete  */}
                                        <div className='  hover:text-richblack-200 hover:cursor-pointer'>
                                            <AiOutlineDelete/>
                                        </div>
                                        
                                        {/* edit  */}
                                        <div className='text-lg hover:text-richblack-200 hover:cursor-pointer'>
                                            <AiOutlineEdit/>
                                        </div>
                                        {/* |  */}
                                        <div>
                                            |
                                        </div>
                                        {/* downarr */}
                                        <div className=' text-lg hover:text-richblack-200 hover:cursor-pointer'>
                                            <AiOutlineCaretDown/>
                                        </div>

                                    </div>
                                </div>
                            </summary>

                            <div className=' mt-4 flex flex-col ml-5
                             text-richblack-200 text-xs font-semibold
                             gap-y-2 pb-5 '>
                                {
                                    section?.subSection?.map((subSection,index)=>{
                                        return(
                                            <div key={index} className=' flex flex-row items-center 
                                            justify-between hover:scale-105 p-1 transition-all duration-200
                                            border-b-2 border-dashed border-richblack-5'
                                            onClick={()=>setViewLec(subSection)}>

                                                <div>
                                                    <header className='  hover:text-richblack-5'>
                                                        {subSection?.title}</header>
                                                </div>

                                                <div className=' flex flex-row justify-center
                                                 items-center gap-x-2 '>

                                                    <div className=' text-lg hover:text-richblack-5'>
                                                        <AiOutlineDelete/>
                                                    </div>
                                                    
                               
                                                    <div className='text-lg hover:text-richblack-5'>
                                                        <AiOutlineEdit/>
                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button className=' w-fit px-2 py-1 rounded-md bg-yellow-50 
                            hover:scale-105 text-richblack-900 transition-all duration-200
                            absolute right-2 bottom-0 translate-y-7 text-xs'
                            onClick={()=>{ setAddLec(section._id)}}>
                                <div className=' flex flex-row gap-x-1 justify-center items-center
                                 font-semibold'>
                                    <AiOutlinePlus/>
                                    <p>Add lecture</p>
                                </div>
                            </button>   



                        </details>
                    )
                })
            }
        </div>

            {
                addLec ? (<SubSectionalModal data={addLec} setter={setAddLec} add={true}/>) : (
                    editLec ? (<SubSectionalModal data={editLec} setter={setEditLec} edit={true}/>) :(
                        viewLec ? (<SubSectionalModal data={viewLec} setter={setViewLec} view={true}/>) 
                            :
                                (<div></div>)
                    )
                )
            }

    </div>
  )
}

export default NestedSections