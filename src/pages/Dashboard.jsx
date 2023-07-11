import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/core/Dashboard/SideBar'

const Dashboard = () => {
  return (
    <div className=' flex flex-row w-screen justify-between'>

        <div className=' w-[19%]' >
         <SideBar/>

        </div>

        <div className=' w-[79%]'>
            <Outlet/>
        </div>


    </div>
  )
}

export default Dashboard