import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateDP } from '../../../../services/operations/settingsApi';

const ProfilePic = () => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);

    const dispatch = useDispatch();

    const [fileInput, setFileInput] = useState(null);

    const [previewFile, setPreviewFile] = useState(null);

    const fileInputRef = useRef(null);

    const handleClick = ()=>{
        fileInputRef.current.click();
    }

    const updatePreview = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = ()=>{
            setPreviewFile(reader.result);
        }
    }

    const fileHandleChange = (e)=>{
        const theFile = e.target.files[0];

        if(theFile){
            setFileInput(theFile);
        }
        console.log("New dp File Uploaded->" , theFile);

        
    }

    const fileUpload = ()=>{

        if(!fileInput){

            return (<span className=' text-white'>
                Upload a image file first</span>)

        }

        try{

            const formData = new FormData();

            formData.append("imageFile",fileInput);

            console.log("Form to be submitted in api call->" , formData);

            //dispatch
            dispatch( updateDP(token,formData) );


        }catch(err){
            console.log("Error in updating dp " ,err.message);

        }

        

    }

    useEffect( ()=>{
        if(fileInput){
            updatePreview(fileInput)
        }
    },[fileInput,user])


  return (
    <div className=' mt-10 mb-10 mx-auto w-5/6 bg-richblack-800
     text-richblack-300 
    flex flex-row items-center
     justify-start rounded-lg gap-6 px-3 py-5'>

        <img src={previewFile || user?.image} alt='dp' className='w-[10%] rounded-full'/>

        <div className=' flex flex-col justify-start items-center gap-2'>
            <p>Update Profile Picture</p>
            <div className=' flex flex-row justify-center items-center gap-x-2'>
                <input
                    type='file'
                    ref={fileInputRef}
                    onChange={fileHandleChange}
                    className="hidden"
                    accept="image/png, image/gif, image/jpeg"
                />

                <button className=' rounded-lg bg-yellow-50
                 text-richblack-900 font-semibold w-fit px-3 py-1
                  hover:bg-yellow-100 hover:text-white hover:scale-105 transition-all duration-300' 
                  onClick={handleClick}>Preview</button>

                <button className=' rounded-lg bg-richblack-600
                 text-richblack-50 font-semibold w-fit px-3 py-1 
                  hover:bg-richblack-800 hover:text-white hover:scale-105 transition-all duration-300' onClick={fileUpload}>
                    Upload 
                </button>
            </div>
        </div>


    </div>
  )
}

export default ProfilePic