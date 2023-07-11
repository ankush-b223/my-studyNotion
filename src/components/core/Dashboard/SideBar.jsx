import React, {  useState } from 'react'

import * as Icons from "react-icons/vsc";

import {sidebarLinks,additionalLinks} from "../../../data/dashboard-links";
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal'; 
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../services/operations/authApi';

const SideBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {user} = useSelector((state)=>state.profile);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }


  return (
    <div className=' h-full bg-gradient-to-r from-[#161D29] via-[#161D29] to-[#000814] 
    min-h-[calc(100vh-3.5rem)] 
    min-w-[220px] flex flex-col -mt-1.5 text-richblack-5 rounded-lg'>

        <div className=' flex flex-col gap-3 mt-5 w-11/12' >
            {
                sidebarLinks.map( (option)=>{

                    const TheIcon = Icons[option.icon];
                    if(option.type === user?.accountType
                        || option.type === "ALL"){

                            return(     

                                
                              
                                <Link key={option.id} to={option.path} >
                                    <div className={` ml-5 flex font-semibold py-1
                                        flex-row justify-start items-center gap-3
                                        text-richblack-300 
                                        hover:scale-105 transition-all duration-500
                                        ${matchRoute(option?.path) && ` border-b-2   border-yellow-50 
                                        w-[100%] text-richblack-5 font-bold text-lg 
                                        max-w-max`}  `}>
        
                                        <TheIcon className={`text-lg
                                         hover:text-white ${matchRoute(option?.path) && `text-richblack-5
                                        `}`}/>
                                        <p>{option.name}</p>
        
                                    </div>
                                </Link>
                            )

                    }


                    else{
                        return null;
                    }

                })

            }

            <div className=' mt-5 w-40 h-0.5 hover:scale-95 
              transition-all duration-200 bg-richblack-300 flex
               justify-center items-center mx-auto'></div>


        </div>

        <div className=' mt-10 flex flex-col  gap-2'>

            {
                additionalLinks.map((option)=>{
                    const TheIcon = Icons[option.icon];

                    if(option.name === "Logout"){

                        return (
                            <button key={option.id}
                                onClick={ ()=>{
                                    console.log("Button Clicked");
                                    setConfirmationModal({
                                        head:"Are you sure?",
                                        para:"You will be logged out",
                                        btn1Handler: () => 
                                            dispatch(logout(navigate)),
                                        btn2Handler: () =>
                                             setConfirmationModal(null),
                                    })
                                }
                                    
                                }
                            
                            className={`  ml-5 flex font-semibold py-3
                                        flex-row justify-start items-center gap-3 
                                        text-richblack-300 
                                        hover:scale-105 
                                        hover:border-b-2
                                        hover:border-pink-500 max-w-max 
                                        transition-all duration-300

                                        ${matchRoute(option?.path) && `
                                        border-b-2  border-yellow-50 
                                        w-[100%] text-richblack-5 
                                        font-bold text-lg 
                                        max-w-max`}  `}>
        
                                        <TheIcon className={`text-lg
                                        hover:text-white ${matchRoute(option?.path) && `text-richblack-5
                                        `}`}/>
                                        <p>{option.name}</p>
        
                            </button>
                        )

                    }
                    
                        return(
                            <Link key={option.id} to={option?.path}>
                                <div className={`  ml-5 flex font-semibold py-3
                                    flex-row justify-start items-center gap-3 
                                    text-richblack-300 
                                    hover:scale-105 hover:border-b-2 hover:border-pink-500 max-w-max transition-all duration-300
                                    ${matchRoute(option?.path) && ` border-b-2  border-yellow-50 
                                    w-[100%] text-richblack-5 font-bold text-lg 
                                    max-w-max`}  `}>
    
                                    <TheIcon className={`text-lg
                                     hover:text-white ${matchRoute(option?.path) && `text-richblack-5
                                    `}`}/>
                                    <p>{option.name}</p>
    
                                </div>
                            </Link>
                        )
                    
                        
                

                    
                })
            }

        </div>

        {
            confirmationModal && <ConfirmationModal data={confirmationModal}/>
        }



    </div>
  )
}

export default SideBar