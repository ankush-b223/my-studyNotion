import React, { useEffect, useState } from 'react'
import Footer from "../components/common/Footer"
import CategorySlider from "../components/core/Category/CategorySlider"
import { useParams } from 'react-router-dom'
import { getCategories, getCategoryPageDetails } from '../services/operations/categoryApi'
import Spinner from "../components/common/Spinner";

const Category = () => {

    const categoryName = useParams();

    const [categoryId, setCategoryId] = useState(null);
    const [categoryPageDetails, setCategoryPageDetails] = useState([])
    const [loading, setLoading] = useState(false);


    const getCategoryId = async()=>{

        const result = await getCategories()

        if(result){
            console.log("Result from categories-> ", result);
            console.log("CategoryName-> ", categoryName);
            const catId = result?.data?.data.filter((ct) => ct.name ===
             categoryName.categoryName)[0]?._id;

            setCategoryId(catId)
        }

    }

    const getCategoryPage = async(categoryId)=>{
        const result = await getCategoryPageDetails({categoryId});

        if(result){
            console.log("Result page []-> ", result );
            setCategoryPageDetails(result);
        }
    }

    useEffect(()=>{

        setLoading(true)
        getCategoryId();
        //setLoading(false)

// eslint-disable-next-line
    },[categoryName])


    useEffect(()=>{

        //setLoading(true)
        if(categoryId){//avoiding call when id is null
            getCategoryPage(categoryId).then(()=>{
                setLoading(false)
            })
        };

// eslint-disable-next-line
    },[categoryId])


        return (

            loading ? (<Spinner/>):
            <div className=' flex flex-col gap-y-5 text-richblack-5 w-screen' >
        
                <header className=' bg-richblack-800 -mt-1.5 '>
        
                    <div className=' flex flex-col px-3 py-14 w-11/12 gap-y-2 mx-auto
                     justify-start items-start
                    '>
                        <h2 className='text-4xl font-bold'>
                            {`${categoryPageDetails.categoryDetails?.name}`}</h2>
                        <p className=' text-sm font-semibold text-richblack-200 '>
                            {`${categoryPageDetails.categoryDetails?.description}`}</p>
                    </div>
        
                </header>
        
                <section className=' w-full'>
        
                   
                    <div className=' w-11/12 mx-auto p-5'>
                        <h3 className=' font-semibold text-xl py-8 underline underline-offset-4'>
                            Courses to get you Started in 
                            {` ${ categoryPageDetails.categoryDetails?.name}`}</h3>
                        <CategorySlider data={categoryPageDetails.categoryDetails?.courses} />
                    </div>
        
                </section>
        
                <section className=' w-full'>
                    <div className=' w-11/12 mx-auto p-5'>
                        <h3 className=' font-semibold text-xl py-8 underline underline-offset-4' >
                            Top-selling Courses</h3>
                        <CategorySlider data={categoryPageDetails.topSellingCourses}/>
                    </div>
                   
                    
                </section>
        
        
                <section>
                    <div className=' w-11/12 mx-auto p-5'>
                        <h3 className=' font-semibold text-xl py-8 underline underline-offset-4'>
                            Popular Courses in {categoryPageDetails?.randomCategoryDetails?.name}</h3>
                        <CategorySlider data={categoryPageDetails?.randomCategoryDetails?.courses}/>
                    </div>  
                    
                </section>
        
                <Footer/>
        
        
        
            </div>
          )
    }

export default Category