import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Player } from "video-react";
import {FiUploadCloud} from "react-icons/fi"
import 'video-react/dist/video-react.css'; // Import the video-react CSS



export default function Upload({
        name,label,register,setValue,errors,
        video=false,viewData=null,editData=null
    }
){


    const [selectedFile, setSelectedFile] = useState(null);
    const [previewFile, setPreviewFile] = useState(
        viewData ? viewData : (editData ? editData : "")
    );

    const inputRef = useRef(null);


    const onDrop = (acceptedFiles)=>{

        const file = acceptedFiles[0];

        if(file){
            previewFileFn(file);
            setSelectedFile(file);
        }
    };

    const {getInputProps,getRootProps,isDragActive} = useDropzone({
        accept: video ? 
            {"video/*":[".mp4"]}
            :
            {"image/*":[".jpeg",".jpg",".png"]} ,
            onDrop,
    });


    const previewFileFn = (file)=>{

        const reader = new FileReader();

        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
            setPreviewFile(reader.result);
        }

    };

    useEffect( ()=>{
        register(name,{ required: true })
    },[register,name])

    useEffect(()=>{
        setValue(name,selectedFile)
    },[selectedFile,setValue,name])


    
    return(

        <div className=" text-richblack-5 w-[100%]">
            <label htmlFor={name} className='text-sm font-semibold '>
                {label} {!viewData && <sup></sup>}
            </label>

            <div  className={`${
                isDragActive ? "bg-richblack-600" : "bg-richblack-700"
                } flex min-h-[250px] cursor-pointer items-center justify-center  relative
                rounded-md border-2 border-dotted border-richblack-500 mx-auto `}
            >
                {previewFile ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewFile}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewFile} muted={true} autoPlay={true} />
            )}

                        {
                            !viewData && <button
                                onClick={ ()=>{
                                    setPreviewFile("");
                                    setSelectedFile(null);
                                    setValue(name,null)
                                }}
                                className="mt-3 text-richblack-400 underline"
                            >Cancel</button>
                        }
                    </div>)
                    :
                    (<div {...getRootProps()} className="flex w-full flex-col items-center p-6 ">

                        <input {...getInputProps()} ref={inputRef} />

                        <div className="grid aspect-square w-14
                         place-items-center rounded-full bg-pure-greys-800">
                            <FiUploadCloud className="text-2xl text-yellow-50" />
                        </div>
                        <p className="mt-2 max-w-[200px] text-center 
                        text-sm text-richblack-200">
                            Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                            <span className="font-semibold text-yellow-50">
                                Browse</span> a file
                        </p>
                        <ul className="mt-10 flex list-disc 
                        justify-between space-x-12 text-center  text-xs text-richblack-200">
                        <li>Aspect ratio 16:9</li>
                        <li>Recommended size 1024x576</li>
                        </ul>
                    </div>)
                }
            </div>
            {
                errors[name] && (
                    <span>
                        {label} is required
                    </span>
                )
            }
        </div>


    );

};