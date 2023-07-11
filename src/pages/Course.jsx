import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operations/paymentApi';
import { toast } from 'react-hot-toast';
import { getCoursePageDetails } from '../services/operations/courseApi';
import { addToCart } from '../slices/cartSlice';
import Spinner from '../components/common/Spinner';
import copy from 'copy-to-clipboard';

const Course = () => {

    const {courseId} = useParams();
    const dispatch =useDispatch()
    const navigate = useNavigate();

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {cart} = useSelector((state)=>state.cart);

    const [courseDetails, setCourseDetails] = useState(null)
    const [instructions, setInstructions] = useState(null)
    const [loading, setLoading] = useState(false)

    const buyClick = ()=>{
        if(token){
            console.log("inside");
            buyCourse(token,[courseId],user,navigate,dispatch);
        }else{
            toast.error("Token Expired, Re-login!");
        }
    }

    const fetchCourseDetails = async()=>{
        try{

            const result = await getCoursePageDetails({courseId:courseId},token)
            setCourseDetails(result);

        }catch(err){
            console.log("wrong in fetch course details call");
        }
    };

    const handleAddToCart = ()=>{
        dispatch(addToCart(courseDetails))
        // toast.success("Course added to cart")
    }

    const handleShare =()=>{
        copy(window.location.href)
        toast.success("Link copied to clipboard!")
    };

    const courseInCart =(courseId)=>{
        let exists = false;
        cart.forEach((cartCourse)=>{
            if(cartCourse?._id === courseId){
                exists = true;
                return;
            }
        })
        return exists;
    }

    useEffect(()=>{
        setLoading(true)
        fetchCourseDetails().then(()=>{
            setLoading(false)
        }
        ) 
        // eslint-disable-next-line 
    },[courseId])

    useEffect(()=>{
        if(courseDetails){
            const splitted = courseDetails?.instructions[0].split(",");
            setInstructions(splitted)
        }
    },[courseDetails])

    if(loading){
        return (
            <Spinner/>
        )
    }

  return (
    <div className=' text-richblack-300 text-sm flex flex-col gap-y-3'>
        
        <section className=' bg-richblack-800 flex flex-col justify-center items-start
         mx-auto -mt-2 p-5 w-full relative'>

            <div className=' w-11/12 flex flex-col justify-center items-start mx-auto gap-y-3'>
                <h2 className='text-richblack-5 text-2xl font-bold'>{courseDetails?.courseName}</h2>
                <p className=' text-sm font-semibold text-richblack-200'>
                    {courseDetails?.courseDescription}</p>
                {/* //ratings component */}
                <p className=' text-sm font-semibold text-richblack-200'>
                    Created by {courseDetails?.instructor?.firstName}
                 {courseDetails?.instructor?.lastName}</p>
                 {/* add language & created at */}
            </div>

            <div className=' absolute w-[20%] flex flex-col justify-center items-center
            right-24 hover:scale-105 transition-all duration-300 -bottom-80 rounded-md'>

                <img src={courseDetails?.thumbnail} alt='thumbnail' 
                className=' h-[180px] w-full rounded-t-md'/>
               
                <div className='flex flex-col justify-center items-start gap-y-3 bg-richblack-700 
                p-4  w-full  '>

                    <p className=' font-semibold text-richblack-5'>RS {courseDetails?.price}</p>

                    <button onClick={ user && user?.courses.includes(courseDetails?._id) ?
                     ()=>navigate("/dashboard/enrolled-courses")
                     : courseInCart(courseDetails?._id) ? (()=>navigate("/dashboard/cart")):
                     (handleAddToCart)
                     
                    }
                    className=' p-2 font-semibold w-2/3 text-yellow-50 bg-richblack-900
                    rounded-md hover:scale-105 transition-all duration-300'>
                        {
                            user && user?.courses.includes(courseDetails?._id) ? ("Go to course")
                            :
                            courseInCart(courseDetails?._id) ? ("Go to Cart"):
                            ("Add To Cart")
                        }
                    </button>

                    <button onClick={buyClick} disabled={user && user?.courses.includes(courseDetails?._id)}
                    className={`p-2 font-semibold w-2/3 bg-yellow-50 text-richblack-900 rounded-md
                    hover:scale-105 transition-all duration-300
                     disabled:bg-yellow-600 disabled:text-richblack-400`}>
                        Buy Now
                    </button>

                    <p className=' text-xs text-center w-full'>30-Day Money-Back Guarantee</p>
                    <p className=' text-richblack-200 text-xs -mb-3 
                    font-semibold underline underline-offset-2 '>
                        This course includes:
                    </p>
                    <ul className=' text-caribbeangreen-100 text-xs list-disc ml-3'>
                        {
                            instructions ? 
                                instructions.map((point,index)=>{
                                    return(
                                        <li key={index}>{point}</li>
                                    ) 
                                }) 
                            :<li></li>
                        }
                    </ul>
                    <button onClick={handleShare} className=' text-yellow-50 underline underline-offset-2
                     w-full
                     text-center text-sm font-semibold hover:cursor-pointer  -mt-1
                    hover:scale-105 transition-all duration-300'> 
                    {/* add copy to linkboard fn */}
                    Share</button>

                </div>

               

            </div>
            
        </section>

        <div className=' border border-richblack-500 px-3 ml-10 rounded-md py-4 w-3/5'>

            <h3 className=' text-xl font-semibold text-richblack-5'>What will you learn?</h3>
            <p>{courseDetails?.whatWillYouLearn}</p>

        </div>

        <div>
            {/* accordion for courseContent */}
        </div>

        <div className=' border border-richblack-500 px-3 py-4 ml-10 w-3/5 flex flex-col gap-y-3
        rounded-md'>
            <h4 className=' text-xl font-semibold text-richblack-5'>Author</h4>
            <div className=' flex flex-row gap-x-4 items-center underline'>
                <img src={courseDetails?.instructor?.image} alt='author' 
                className=' rounded-full w-[10%] object-cover aspect-square'/>
                <p>{courseDetails?.instructor?.firstName}
                 {courseDetails?.instructor?.lastName}</p>
            </div>
            <p>{courseDetails?.instructor?.additionalDetails?.about}</p>
        </div>

        <div>
            {/* review slider of course */}
        </div>
        
    </div>
  )
}

export default Course