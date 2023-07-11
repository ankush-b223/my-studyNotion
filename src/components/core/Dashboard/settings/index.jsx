import React from 'react'
import ProfilePic from './ProfilePic'
import EditProfile from './EditProfile'
import ChangePass from "./ChangePass"
import DeleteAC from './DeleteAC'

const Settings = () => {
  return (
    <div className=' flex flex-col justify-center items-center
     text-richblack-5 w-[100%] '>

        <ProfilePic/>

        <EditProfile/>

        <ChangePass/>

        <DeleteAC/>

    </div>
  )
}

export default Settings