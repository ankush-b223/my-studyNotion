import React, { useEffect,useState } from 'react'

import logo from  "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'

import {NavbarLinks} from "../../data/navbar-links";

import {IoIosArrowDropdownCircle} from "react-icons/io"
import {LuLayoutDashboard} from "react-icons/lu"
import {FiShoppingCart} from "react-icons/fi"

import { useSelector } from 'react-redux';

import {apiConnector} from "../../services/apiConnector";
import {categories} from "../../services/apis";
import ProfileNav from './ProfileNav';




const Navbar = () => {

  const {token} = useSelector( (state)=> state.auth );
  const {user} = useSelector( (state)=> state.profile);
  const {totalItems} = useSelector( (state) => state.cart);

  const navigate = useNavigate();
  const location = useLocation(); //location.pathname

  const matchRoute = (route)=>{ 

    return matchPath({path:route},location.pathname);

  }

  const [subCategories, setSubCategories] = useState([]);

  const fetchSubCategories = async()=>{
    const result = await apiConnector("GET" ,
    categories.CATEGORIES_API );

    const toShowCategories = result.data.data

    setSubCategories(toShowCategories);

    // console.log("Response from category call",toShowCategories);
  }

  useEffect( ()=>{
    fetchSubCategories();
  },[])

  return (
    <div className=' m-auto mt-2 w-11/12 flex justify-around
     border-b-2 items-center border-richblack-700 p-3 pt-6 mb-1'>

      <Link to={"/"}>
        <img src={logo} alt='logo' />
      </Link>

      <nav>
        <ul className=' flex flex-row gap-4 font-semibold'>
          {
            NavbarLinks.map( (option,index)=>{
              return(
                <li key={index}>
                  {
                      option.title === "Catalog" ? 
                      (<span className=' relative group
                       text-richblack-25 hover:cursor-pointer
                        flex flex-col gap-1 items-center'>
                          <div className='flex flex-row gap-2 
                          justify-center items-center'>
                            {option.title}
                            <IoIosArrowDropdownCircle/> 
                          </div>
                          
                          {/* {dropdowm categories div} */}
                          <div className=' absolute invisible group-hover:visible
                           bg-white text-richblack-800 font-semibold
                            flex flex-col  transition-all
                             duration-500 translate-y-10 w-fit h-fit max-h-[300px]
                              z-50 '>
                              {
                                
                                
                                subCategories.map( (category,index)=>{
                                  return(
                                    
                                    <Link to={`/category/${category.name}`} key={index} className=' border-b-2
                                     border-richblack-800 p-2
                                       hover:bg-richblack-900
                                        hover:text-richblack-25
                                         hover:border-richblack-25
                                         transition-all
                                         duration-200 '>{category.name}</Link>
                                  )
                                
                                })
                              }
                              </div>      
        
                      </span>
                      )
                      :
                      (             //if option.path exists -> ?.
                        <Link to={option?.path} className="
                         text-richblack-25">
                          <p className={` ${matchRoute(option?.path) ? 
                            " text-yellow-50"
                            :
                            " text-richblack-25"}`}>{option.title}</p>
                        </Link>
                      )
                  }
                  
                </li>
              
                
              )
            })
          }
        </ul>
      </nav>
      

      <div className='flex flex-row justify-center items-center 
       gap-3'>
        {

          token && user  ? (
            <div className=' flex flex-row justify-center items-center
             m-auto gap-4'>

              
              <Link to="/dashboard/cart" className=' relative flex flex-row 
              justify-center items-center gap-3'>
                  <FiShoppingCart color='white' className=' hover:scale-110 ' onClick={ ()=>{
                    navigate("/cart")
                  }}/>
                  <div className=' absolute to -top-4 left-3 translate-y-1
                   text-xs text-yellow-100 '>{totalItems}</div>


              </Link>
              <LuLayoutDashboard onClick={()=> navigate("/dashboard/my-profile")} color='white'
               className=' hover:scale-105 cursor-pointer '/>
              <ProfileNav/>


            </div>
            
          )
          :
          ( 
          
          <Link to="/login">
              <button className=' text-richblack-25 font-semibold text-sm
               bg-richblack-800 rounded-sm w-fit
                px-5 py-1 hover:scale-105 hover:bg-richblack-700'>Login</button>
            </Link>
          )

        }
        { //add css
           token && user  ? (<div></div>//<Link to="/dashboard/cart">
          // //         <FiShoppingCart color='white'/>
          // //         <div className=' text-richblack-50'>{totalItems}</div>
          // // </Link>
          )
          :
          (<Link to="/signup">
          <button className=' text-richblack-25 font-semibold text-sm
               bg-richblack-800 rounded-sm w-fit
                px-5 py-1 hover:scale-105 hover:bg-richblack-700'>Signup</button>
        </Link>)
        }
      </div>



    </div>
  )
}

export default Navbar