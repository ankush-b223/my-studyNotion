import React from 'react';
import {FaArrowRight} from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/Home/HighlightText';
import CTAButton from '../components/core/Home/CTAButton';

import banner from "../assets/Images/banner.mp4";
import CodeBlock from '../components/core/Home/CodeBlock';

import "../App.css"
import Principles from '../components/core/Home/Principles';
import Progress from '../components/core/Home/Progress';
import Become from '../components/core/Home/Become';
import ReviewSlider from '../components/core/Home/ReviewSlider'
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <div>
        

        { /* Section 1 */ }
        <section className='relative mx-auto w-11/12
         flex flex-col justify-between items-center text-white
          max-w-maxContent'>



          <Link to={"/signup"}>
            <div className=' group p-1 mt-16 rounded-full font-bold
              bg-richblack-800 text-richblack-200 w-fit
               transition-all duration-200 hover:scale-105   '>

              <div className=' flex flex-row gap-2 
              px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                <p>Become an Instructor</p>
                <FaArrowRight></FaArrowRight>

              </div>
            </div>

          </Link>
          

          <div className=' font-semibold text-white mt-7 text-4xl'>
            Empower Your Future with
            <HighlightText text={"Coding Skills"}></HighlightText>

          </div>

            
          <div className=' w-[90%] mt-6 text-richblack-300 
          text-lg text-center  '>

            <p>With our online coding courses, you can learn at your own pace,
               from anywhere in the world, and get access to a wealth of resources,
               including hands-on projects, quizzes, and personalized feedback
                from instructors. </p>

          </div>

          <div className=' mt-10 flex flex-row gap-8'>
            <CTAButton active={true} link={"/signup"} >
              Learn More
            </CTAButton>
            <CTAButton active={false} link={"/login"}>
              Book a demo
            </CTAButton>
          </div>

          <div className=' mt-14 mx-20 my-5 shadow-blue-200'>
            <video autoPlay loop muted>
              <source src={banner} type='video/mp4'>
              </source>
            </video>

          </div>
          

          <CodeBlock flexDirection={"lg:flex-row"}
              heading={
                <div className='font-semibold text-white mt-7 text-4xl'>
                  Unlock your 
                  <HighlightText text={"coding potential "}></HighlightText>
                  with our online courses.
                </div>} 

              paragraph={`Our courses are designed and taught by industry experts 
              who have years of experience in coding and are passionate about sharing
              their knowledge with you.`} 
            
              ctaBtn1={{
                  active: true ,
                  text: "Try it Yourself" ,
                  link: "/signup",
              }}
              ctaBtn2={{
                active: false ,
                text: "Learn More" ,
                link: "/login",
              }}

              codeColor={"text-yellow-200"}

              code = {`<<!DOCTYPE html>>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n`}
          >

          </CodeBlock>

          <CodeBlock flexDirection={"lg:flex-row-reverse"}
              heading={
                <div className='font-semibold text-white mt-7 text-4xl'>
                  Start 
                  <HighlightText text={"coding in seconds "}></HighlightText>
                  
                </div>} 

              paragraph={`Go ahead, give it a try. Our hands-on learning environment
               means you'll be writing real code from your very first lesson.`} 
            
              ctaBtn1={{
                  active: true ,
                  text: "Continue Lesson" ,
                  link: "/login",
              }}
              ctaBtn2={{
                active: false ,
                text: "Learn More" ,
                link: "/login",
              }}

              codeColor={" text-pink-100"}

              code = {`<<!DOCTYPE html>>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n`}
          >

          </CodeBlock>


          


        </section>




        { /* Section 2 */ }
        <section className=' bg-pure-greys-5'>

          <div className='backDesignS2 h-[310px] flex flex-row 
          justify-center items-center gap-3 w-11/12 max-w-maxContent m-auto' >
              <CTAButton active={true} link={"/signup"}>
                <div className='flex flex-row gap-2'>
                  Explore Full Catalog 
                  <FaArrowRight></FaArrowRight>
                </div>
              </CTAButton>
              <CTAButton active={false} link={"/login"}>Learn more</CTAButton>
          </div>

          <div className='flex flex-row w-11/12 max-w-maxContent 
           justify-center items-center  gap-3 py-6 px-3 m-auto mt-6'>
            <div className='w-[50%] text-richblack-900 font-bold text-3xl'>
              Get the skills you need for a 
              <HighlightText text={" job that is in demand"}/>
            </div>
            <div className=' w-[50%] flex flex-col items-start gap-3 mt-9 '>
              <p className=" text-richblack-700 py-10 text-lg font-semibold" >The modern StudyNotion is the dictates its own terms.
                Today, to be a competitive specialist requires more than 
                professional skills.</p>
                <CTAButton active={true} link={"/login"}>Learn More</CTAButton>
            </div>
          </div>

          <Principles></Principles>

          <Progress></Progress>

        </section>




        { /* Section 3 */ }
        <section className='relative mx-auto w-11/12
         flex flex-col justify-between items-center text-white
          max-w-maxContent'>

            <Become></Become>

            <ReviewSlider></ReviewSlider>

        </section>



        { /* Footer */ }
        <Footer/>



    </div>
  )
}

export default Home