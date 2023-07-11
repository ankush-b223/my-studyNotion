import React from 'react'

import "./general.css"

const Spinner = () => { 
  // useEffect(()=>{
  //   console.log("Spinner is here");

  // },[]);

  return (
    // <div className="flex flex-col items-center justify-center h-screen">
    //     <div className="animate-spin rounded-full h-10 w-10
    //      border-t-2 border-b-2 border-gray-900 text-richblack-200 
    //      flex flex-col justify-center items-center  ">
          
    //      </div>
    // </div>

    <div className="spinner" >
      <div></div>   
      <div></div>    
      <div></div>    
      <div></div>    
      <div></div>    
      <div></div>    
      <div></div>    
      <div></div>    
      <div></div>    
      <div></div>    
    </div>
  )
}

export default Spinner