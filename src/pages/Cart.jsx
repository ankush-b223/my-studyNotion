import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import {TbCoinRupee} from "react-icons/tb"
import { toast } from 'react-hot-toast';
import { buyCourse } from '../services/operations/paymentApi';
import {AiOutlineDelete} from "react-icons/ai"
import { removeFromCart } from '../slices/cartSlice';
import RatingStars from '../components/common/RatingStars';
import GetAvgRating from '../utilities/avgRating';

const Cart = () => {

    const {cart,totalItems,total} = useSelector((state)=>state.cart);
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);

    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    const avgRating = (ratingArr)=>{
        const averageRating = GetAvgRating(ratingArr);

        return averageRating;
    }

    const buyHandler = ()=>{
        if(token){
            buyCourse(token,cart,user,navigate,dispatch);
        }else{
            toast.error("Token Expired, Re-login!");
        }
    };

    const deleteItem = (courseId)=>{
        //dispatch(resetCart())
        dispatch(removeFromCart(courseId))
    }

    useEffect(()=>{
        if(cart.length){
            console.log("The cart arr-> ",cart);
        }
    },[cart])

  return (
    <div className=' text-richblack-200 w-11/12 mx-auto mt-10'>

        {
            cart.length === 0 ? (<div className=' text-xl flex flex-row justify-center items-center
             bg-richblack-800 p-10 w-5/6 mx-auto rounded-md
             text-center gap-x-3 text-richblack-5 font-bold' >Nothing in cart ,
                    <Link to="/category/Blockchain" className=' text-caribbeangreen-50 font-semibold 
                    underline underline-offset-4'>
                        Checkout few courses!</Link>
                </div>
            )
            :
            (<div className=' flex flex-col gap-y-3 '>

                <div className='w-11/12 mx-auto'>
                    <p className=' text-richblack-5 font-bold underline underline-offset-2'>
                        Your Cart:
                    </p>
                </div>
                
                <div className=' flex flex-row gap-x-4 w-11/12 mx-auto'>

                    <div className='w-[66%] flex flex-col gap-y-6
                     bg-richblack-800 rounded-md px-9 py-10 '>
                        
                        {
                            cart.map((course,index)=>{
                                return(
                                    <div to={`/course/${course._id}`} key={index} 
                                    className='  border-b-[0.5px] border-richblack-200 
                                    flex flex-row gap-x-2   w-full justify-between items-center
                                    hover:scale-105 transition-all duration-300 '>

                                        <div className=' flex gap-x-3 items-start' 
                                        onClick={()=>navigate(`/course/${course._id}`)}>
                                            <div className=' flex justify-start '>
                                                <img src={course?.thumbnail} alt='thumbnail'
                                                className=' h-[130px] w-[180px]  rounded-md'/>
                                            </div>

                                            <div className=' flex flex-col justify-start gap-y-2'>
                                                <h2 className=' text-richblack-5 text-lg font-semibold'>
                                                    {course.courseName}</h2>
                                                <p className=' text-sm flex gap-x-1'> By 
                                                    <span> {course.instructor?.firstName}</span>
                                                </p>
                                                <RatingStars Review_Count={avgRating(course?.ratingAndReviews)}
                                                  Star_Size={12}/>
                                            </div>
                                        </div>
                                        
                                        <div className=' flex flex-row justify-center items-center gap-x-3'>
                                            <div className=' text-yellow-50 text-lg
                                            font-semibold flex gap-x-2 underline underline-offset-2'>
                                                Rs <span>
                                                {course.price}</span>
                                            </div>
                                            <div>
                                                <button onClick={()=>deleteItem(course._id)}><AiOutlineDelete className='
                                                 hover:scale-110 hover:text-pink-200 text-xl'/></button>
                                            </div>
                                        </div>
                                    
                                    </div>
                                )
                            })
                        }
                    </div>

                <div className=' w-[33%] bg-richblack-800 
                flex flex-col gap-y-4 items-center justify-start pt-7 text-xl pb-5 rounded-md'>
                    
                    <p className=' text-richblack-5 font-bold underline underline-offset-2'>
                        Checkout
                    </p>

                    <div className=' flex flex-row gap-x-2 mx-auto justify-center items-center
                     mt-10 mb-10 w-fit text-sm'>
                        <p>Total Items: <span className=' text-yellow-50 font-semibold'>
                            {totalItems}</span></p>
                        <p className=' flex flex-row  gap-x-[3px]  items-center'>Total Price: 
                        <TbCoinRupee className='text-richblack-5'/> <span className='  font-semibold text-yellow-50'>
                            {total}</span></p>
                    </div>

                    <button onClick={buyHandler}
                    className=' w-5/6 bg-yellow-50 text-richblack-900 font-semibold
                     rounded-md px-1 py-2 hover:scale-105 transition-all duration-300'>
                        Complete Purchase
                    </button>

                </div>
                
            </div>
            </div>
            )
        }
        
 
    </div>
  )
}

export default Cart