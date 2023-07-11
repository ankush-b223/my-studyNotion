import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Spinner from "../../../common/Spinner"
import { getInstructorCourses, getInstructorStats } from '../../../../services/operations/courseApi';
import CategorySlider from '../../Category/CategorySlider';
import InstructorChart from './InstructorChart';

const InstructorDashboard = () => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);

    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(false);


    const getInstructorData = async()=>{
        const res = await getInstructorStats(token)
        setInstructorData(res);

        const response = await getInstructorCourses(token);
        setCourses(response);
    };

    const totalRevenue = ()=>{
        
        const total = instructorData?.reduce((acc,curr)=> acc + curr?.totalRevenue ,0);

        return total;
    };

    const totalStudents = ()=>{
        
        const totalStudents = instructorData?.reduce((acc,curr)=> acc+curr?.totalStudents,0);

        return totalStudents;
    }

    useEffect(()=>{
        setLoading(true);
        getInstructorData().then(()=>{
            setLoading(false)
        })

        // eslint-disable-next-line
    },[token])



    if(loading){
        return <Spinner/>
    }

  return (
    <div className=' text-richblack-200 w-11/12 flex flex-col gap-y-16 mx-auto mt-5'>
        
        <div>
            <h2 className=' text-2xl font-bold text-richblack-5'>Hey {user?.firstName} 👋 </h2>
            <p className=' underline'>Here's your Dashboard!</p>
        </div>

        <div className=' flex flex-row justify-evenly items-start gap-x-2'>
            <div><InstructorChart courses={instructorData}/></div>
            <div className=' flex flex-col gap-y-5 justify-around items-center px-16 bg-richblack-800 py-40 rounded-md'>

                <h3 className=' text-xl font-bold text-richblack-5 underline underline-offset-2'>
                    Statistics:
                </h3>

                <p className='border-b-[1px]'>Your Total Students: <span className=' text-yellow-50'>
                    {totalStudents()}</span> </p>
                <p className='border-b-[1px]'>Your Total Revenue: <span className=' text-yellow-50 font-semibold'>
                    {totalRevenue()}</span></p>
            </div>
        </div>
        <h3 className=' text-lg font-bold text-richblack-5 underline underline-offset-2'>
                    My Courses:
        </h3>
        <div className=' w-11/12 ml-52 justify-center items-center mx-auto mb-10'>
                
            <CategorySlider data={courses}/>
        </div>

    </div>
  )
}

export default InstructorDashboard