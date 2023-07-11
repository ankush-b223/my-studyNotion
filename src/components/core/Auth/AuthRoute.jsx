import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

//prevents authenticated users from accessing auth routes
const AuthRoute = ({children}) => {

    const {token} = useSelector((state)=>state.auth);

    if(token === null){
        return children;
    }

  return (
    <Navigate to="/dashboard/my-profile"/>
  )
}

export default AuthRoute