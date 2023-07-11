import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {BsChevronCompactDown,BsChevronCompactUp} from "react-icons/bs"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CourseReviewModal from './CourseReviewModal';
import { checkReviewAdded } from '../../../services/operations/viewCourseApi';

const ViewSideBar = () => {

  const [activeSection, setActiveSection] = useState(null);
  const [activeLecture, setActiveLecture] = useState(null);
  const [reviewModal, setReviewModal] = useState(null)

  const {courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures}= useSelector((state)=>state.viewCourse);

  const navigate = useNavigate();
  const location = useLocation();

  const {courseId,sectionId,subSectionId} = useParams();
  const {token} = useSelector((state)=>state.auth)

  const setActive = ()=>{
    
    const activeSectionIndex = courseSectionData?.findIndex((section)=>
      section?._id === sectionId
    );

    const activeLectureIndex = courseSectionData?.[activeSectionIndex]?.subSection.findIndex((subSection)=>
      subSection?._id === subSectionId
    );

    const activeLectureId = courseSectionData?.[activeSectionIndex]?.subSection?.[activeLectureIndex]?._id;

    setActiveSection(courseSectionData?.[activeSectionIndex]?._id);
    setActiveLecture(activeLectureId)

  }

  const handleNavigate = (lecId)=>{
    if(lecId === activeLecture){
      return null;
    }
    else{
      navigate(`/view-course/${courseId}/section/${activeSection}/subSection/${lecId}`)
    }
  }
 
  const addReview =async()=>{
    const reviewExists = await checkReviewAdded(courseId,token)

    if(reviewExists){
      return;
    }
    setReviewModal(courseId);
  }

  useEffect(()=>{

    setActive();

    // eslint-disable-next-line
  },[courseEntireData,courseSectionData,location.pathname])
  

  return (
    <div className='h-full bg-gradient-to-r from-[#161D29] via-[#161D29] to-[#000814] 
      min-h-[calc(100vh-3.5rem)] 
      min-w-[220px] flex flex-col -mt-1.5 text-richblack-200 rounded-sm '>

      <div className=' flex flex-row gap-x-2 w-11/12 mx-auto mt-4 border-b-[1px]
       border-richblack-300 pb-4'
      >
        <div className=' flex flex-col gap-y-1 w-full mx-auto'>
          <h2 className=' text-richblack-5 font-bold underline underline-offset-4'>
            {courseEntireData?.courseName}
          </h2>
          <p className=' text-sm'>{completedLectures.length}/{totalNoOfLectures}</p>
        </div>

        <button onClick={()=>addReview()}
         className=' bg-yellow-50 w-fit text-richblack-900 text-xs 
         px-2 py-1 font-semibold rounded-md mr-2 hover:scale-105 hover:text-richblack-800 
         transition-all duration-300 hover:bg-yellow-25'>Add Review</button>
        
      </div>

      <div className=' w-full mx-auto mt-2 '>

        {
          courseSectionData.map((section,index)=>{
            return(<div key={index} className=' '>

              <header onClick={()=>{
                setActiveSection(section?._id) 
              }}
               className={` px-3 py-1 flex flex-row font-semibold 
               ${section?._id === activeSection ? " bg-yellow-50" : "bg-yellow-600"}
               justify-between items-center   text-richblack-900 rounded-sm
               hover:scale-105 hover:cursor-pointer 
               hover:text-richblack-800 transition-all duration-300`}>
                <p className=' underline underline-offset-2 capitalize font-semibold '>{section?.sectionName}</p>
                {
                  section?._id === activeSection ? <BsChevronCompactUp className=' text-lg 
                    hover:cursor-pointer text-richblack-600 '/> 
                  :
                  <BsChevronCompactDown 
                    className=' text-lg hover:cursor-pointer text-richblack-600 '/>

                }
              </header>

              <section className=' w-11/12  mx-auto mt-2 ml-5 flex flex-col gap-y-2'>
                {
                  section?._id === activeSection && (
                    <div className=' flex flex-col gap-y-3 mb-3'>
                      {
                        section?.subSection.map((lecture,index)=>{
                          return(
                            <div key={index} onClick={()=> handleNavigate(lecture?._id)}
                             className={` text-sm border-b-[1px] border-r-[1px]
                            ${lecture?._id === activeLecture ? "border-yellow-50 text-yellow-300 font-semibold" :
                             " text-richblack-500 border-yellow-600"}
                            rounded-sm
                            hover:scale-105 hover:cursor-pointer 
                            hover:text-richblack-5 transition-all duration-300`}>
                              <div className=' flex flex-row gap-x-2 items-center justify-center p-1'>
                                <input type='checkbox' 
                                checked={completedLectures.includes(lecture?._id)}
                                onChange={()=>{}}
                                />
                                <p>{lecture?.title}</p>
                              </div>
                              
 
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                  
                }
              </section>


            </div>) 
          })
        }

      </div>

      { reviewModal && <CourseReviewModal courseId={reviewModal} setReviewModal={setReviewModal}/>}

    </div>
  )
}

export default ViewSideBar


