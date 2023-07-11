import React, { useEffect, useState } from 'react'
import {MdCancel} from "react-icons/md"

const Requirements = ({
    label,name,placeholder,register,errors,setValue
}) => {

    const [list, setList] = useState([]);

    const handleKeyDown = (event)=>{

        if(event.key === "Enter"){
            event.preventDefault();

            const requirement = event.target.value;

            if(requirement && !list.includes(requirement)){

                const addedReq = [...list,requirement];
                console.log("got tag and putting to tags arr");
                setList(addedReq);

                event.target.value = "";
            }

        }
    };


    const deleteReq = (index)=>{
        const copyList = [...list];
        copyList.splice(index,1)

        setList(copyList);
    }

    useEffect(()=>{
        register(name,list)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[register,name])

    useEffect(()=>{
        setValue(name,list)
    },[list,name,setValue])

  return (
    <div className=' w-full flex flex-col gap-y-4'>

        <label htmlFor={name}>{label}</label>
        <div>
            
            <input
            type='text'
            name={name}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className=' bg-richblack-700 text-base w-[100%]
            px-4 py-2 rounded-md  text-richblack-200'
            />

        </div>
        
        {
            errors[name] && (
                <span>{label} is required</span>
            )
        }
        <div className=' w-full '>
            {
                list.length > 0 && (
                    <ul className=' flex flex-col w- font-semibold text-xs bg-richblack-900 p-2 rounded-lg gap-y-2 
                     mb-3 pt-3 pb-3 '>
                        {
                            list.map((req,index)=>{
                                return(
                                    <div key={index} className=' w-11/12 mx-auto flex flex-row justify-between items-center'>

                                        <li>
                                            {req}
                                        </li>
                                        <button onClick={ ()=>{
                                            deleteReq(index)
                                        }}>
                                            <MdCancel className='text-yellow-50'/>
                                        </button>

                                    </div>
                                   

                                )
                            })
                        }
                    </ul>
                )
            }
        </div>

    </div>
  )
}

export default Requirements