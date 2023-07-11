import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullCourseContent } from '../services/operations/viewCourseApi';
import ViewSideBar from "../components/core/viewCourse/ViewSideBar"
import Spinner from '../components/common/Spinner';

const ViewCourse = () => {
    
    const [loading, setLoading] = useState(false);
    
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const fetchEntireCourseContent = async()=>{
        const result = await getFullCourseContent(courseId,token,dispatch);
        console.log("Response from courseContent Api Call -> ", result);
    }

    useEffect(()=>{
        setLoading(true)
        fetchEntireCourseContent().then(()=>{
            setLoading(false);
        })
        // eslint-disable-next-line
    },[courseId])

    if(loading){
        return <Spinner/>
    }

  return (
        <div className=' flex flex-row w-screen justify-between'>

            <div className=' w-[19%]' >
            <ViewSideBar/>

            </div>

            <div className=' w-[79%]'>
                <Outlet/>
            </div>


        </div>
    )
}

export default ViewCourse