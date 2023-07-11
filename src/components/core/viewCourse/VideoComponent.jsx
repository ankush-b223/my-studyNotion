import React, { useEffect, useRef, useState } from 'react'
import Spinner from '../../common/Spinner';
import { Player } from 'video-react';
import "video-react/dist/video-react.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {AiFillPlayCircle} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { markLectureComplete } from '../../../services/operations/viewCourseApi';


const VideoComponent = () => {

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setvideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();

  const {courseSectionData,courseEntireData,completedLectures} = useSelector((state)=>state.viewCourse);
  const {token} = useSelector((state)=>state.auth);

  const {courseId,sectionId,subSectionId} = useParams();


  const isFirstLecture = ()=>{
    if(courseSectionData?.[0]?._id === sectionId &&
        courseSectionData?.[0]?.subSection?.[0]?._id === subSectionId){
      return true;
    }else{
      console.log("First is false" , courseSectionData?.[0]?._id === sectionId);
        return false;
      }
  };

  const isLastLecture = ()=>{

    const sectionIndex = courseSectionData.findIndex((section)=> 
      section?._id === sectionId);

    const noOfSections = courseSectionData.length;

    if(sectionIndex === noOfSections - 1){
      const subSectionIndex = courseSectionData?.[sectionIndex]?.subSection.findIndex((subSection)=>
        subSection?._id === subSectionId);
      
      const noOfLectures = courseSectionData?.[sectionIndex]?.subSection.length;

      if(subSectionIndex === noOfLectures - 1){
        return true;
      }

    }else{
      return false
    }


  };

  const goToNextLecture = ()=>{
    const sectionIndex = courseSectionData.findIndex((section)=> section?._id === sectionId);
    const lectureIndex = courseSectionData?.[sectionIndex]?.subSection.findIndex((lecture)=>
      lecture?._id === subSectionId);

    const lecturesInSection = courseSectionData?.[sectionIndex]?.subSection.length;

    if(lectureIndex === lecturesInSection - 1){
      navigate(`/view-course/${courseId}/section/${courseSectionData?.[sectionIndex + 1]?._id}/subSection/${courseSectionData?.[sectionIndex+1]?.subSection?.[0]?._id}`);
    }else{
      navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${courseSectionData?.[sectionIndex]?.subSection?.[lectureIndex+1]?._id}`);

    }
  };

  const goToPrevLecture = ()=>{
    const sectionIndex = courseSectionData.findIndex((section)=> section?._id === sectionId);
    const lectureIndex = courseSectionData?.[sectionIndex]?.subSection.findIndex((lecture)=>
      lecture?._id === subSectionId);

    if(lectureIndex === 0){
      const toBeLecIndex = courseSectionData?.[sectionIndex-1]?.subSection.length - 1;
      navigate(`/view-course/${courseId}/section/${courseSectionData?.[sectionIndex - 1]?._id}/subSection/${courseSectionData?.[sectionIndex - 1]?.subSection?.[toBeLecIndex]?._id}`);
    }else{
      navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${courseSectionData?.[sectionIndex]?.subSection?.[lectureIndex-1]?._id}`);

    }
  };

  const markComplete = async()=>{

    if(completedLectures.includes(subSectionId)){
      console.log("lecture already marked!");
      return;
    }

    setLoading(false);
    const res = await markLectureComplete(completedLectures,subSectionId,courseId,token,dispatch);
    console.log("Res from service call-> ",res);
    if(res && !isLastLecture()){
      
      goToNextLecture()
    }else{
      return 
    }
  };

  const replay = ()=>{
    if(playerRef?.current){
      playerRef?.current?.seek(0)
      setvideoEnded(false);
    }
  }




  const setData = ()=>{

    if(courseSectionData.length === 0 ){
      return null;
    }
    if(!courseId || !sectionId || !subSectionId){
      navigate(`dashboard/enrolledCourses`);
    }

    const activeSection = courseSectionData.filter((section)=> section?._id === sectionId);

    const activeLecture = activeSection?.[0]?.subSection.filter((lecture)=> lecture?._id === subSectionId);

    if(activeLecture){
      setVideoData(activeLecture[0]);
      setvideoEnded(false);
    }

  }


  useEffect(()=>{

    setData();

      // eslint-disable-next-line
  },[courseEntireData,courseSectionData,location.pathname])



  if(loading){
    return <Spinner/>
  }

  return (
    <div className="flex flex-col gap-5 text-white mr-10 ">

      <div>
        {
          videoData ?  (
            <Player 
              autoPlay={true}
              aspectRatio="16:9"
              ref={playerRef}
              playsInline
              onEnded={()=>setvideoEnded(true)}
              src={videoData?.videoUrl}
            >

              <AiFillPlayCircle position="center" className='text-richblack-700' />


              {
                videoEnded && <div style={{
                  backgroundImage:
                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                }}
                className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">

                 <div className=' flex flex-col justify-center items-center mx-auto gap-y-2'>
                 {
                    !completedLectures.includes(subSectionId)  &&
                    <button className=' bg-yellow-50 text-richblack-900 font-semibold
                  w-fit px-3 py-1 rounded-md text-lg 
                  hover:scale-105 hover:bg-yellow-100 hover:text-richblack-800
                  transition-all duration-300' onClick={()=>markComplete()}>Mark as Completed & Continue</button>
                 }

                <button className=' bg-yellow-50 text-richblack-900 font-semibold
                      w-fit px-3 py-1 rounded-md text-lg 
                      hover:scale-105 hover:bg-yellow-100 hover:text-richblack-800
                      transition-all duration-300' 
                      onClick={()=> replay()}>Rewatch
                </button>

                 <div className=' flex flex-row gap-x-3'>
                  {
                    videoEnded && !isFirstLecture() && (
                      <button className=' bg-yellow-50 text-richblack-900 font-semibold
                      w-fit px-3 py-1 rounded-md text-lg 
                      hover:scale-105 hover:bg-yellow-100 hover:text-richblack-800
                      transition-all duration-300'
                      onClick={()=>goToPrevLecture()}
                      >Prev</button>
                    )
                  }
                  {
                    videoEnded  && !isLastLecture() && (
                      <button className=' bg-yellow-50 text-richblack-900 font-semibold
                      w-fit px-3 py-1 rounded-md text-lg 
                      hover:scale-105 hover:bg-yellow-100 hover:text-richblack-800
                      transition-all duration-300'
                      onClick={()=> goToNextLecture()}
                      >Next</button>
                    )
                  }
                 </div>
                 
                 </div>
                

                </div>
              }

            </Player>

            
          ) 
          :
          (<div>
              No data found
            </div>)
        }
      </div>

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
      
    </div>
  )
}

export default VideoComponent