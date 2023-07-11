import React, { useCallback, useEffect, useState } from 'react'
import {MdCancel} from "react-icons/md"

const ChipInput = ({
    label,name,placeholder,register,errors,setValue
}) => {


    const [tags, setTags] = useState([]);

    const registerCallback = useCallback(register
        ,[register]); 
        
    useEffect(()=>{
        //validate tags for edit option

        //register tag array
        registerCallback(name,{required:true , validate: (value)=> value.length >0})
    },[name, registerCallback])

    //useEff for tags
    useEffect(()=>{
        
        setValue(name,tags)

    },[name, setValue,tags])

    const handleKeyDown = (event)=>{

        if(event.key === "Enter" || event.key === ","){
            event.preventDefault();

            const aTag = event.target.value.trim()

            if(aTag && !tags.includes(aTag)){
                const addedTag = [...tags,aTag];
                console.log("got tag and putting to tags arr");
                setTags(addedTag);

                event.target.value = ""
            }
        }
    };

    const deleteTag = (index)=>{
        console.log("the index to be removed-> " ,index );
        const copyTags = [...tags];
        copyTags.splice(index,1);
        console.log("After removing a tag, New tags arr -> ", copyTags);
        setTags(copyTags);

    }

  return (
    <div className=' flex flex-col gap-y-2'>
        <label>{label}</label>
        <div className=' flex flex-row gap-x-1 gap-y-2 text-sm font-semibold w-[100%] flex-wrap'>   

            {
                tags.map((tag,index)=>{
                    return(
                        <div key={index} className=' bg-yellow-100
                         text-richblack-900 w-fit p-1 rounded-lg flex flex-row gap-x-1'>
                            {tag}
                            <button type='button'  onClick={()=> deleteTag(index)}><MdCancel/></button> 
                        </div>
                    )
                })
            }

        </div>

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
        {errors[name] && (
        <span className="">
          {label} is required
        </span>
      )}


    </div>
  )
}

export default ChipInput