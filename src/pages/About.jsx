import React from 'react'
import HighlightText from '../components/core/Home/HighlightText'

import img1 from "../assets/Images/aboutus1.webp"
import img2 from "../assets/Images/aboutus2.webp"
import img3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/About/Quote'
import FVM from '../components/core/About/FVM'
import Stats from '../components/core/About/Stats'
import Footer from '../components/common/Footer'
import Grid from '../components/core/About/Grid'
import ContactUs from '../components/common/ContactUs'


const About = () => {
  return (

    <div className=' bg-richblack-900 text-richblack-300 '>

        <section className=' bg-richblack-800 max-w-maxContent lg:min-h-[500px]
         flex flex-col justify-center items-center  m-auto p-4 gap-2 -mt-2'>

            <div className='  relative w-11/12 flex flex-col 
            justify-center items-center  m-auto p-4 gap-2' >

                <h2 className=' -mt-44 mb-2 text-richblack-5
                 text-2xl font-bold w-[50%] text-center m-auto'>
                    Driving Innovation in Online Education for a 
                    <HighlightText text={"Brighter Future"}/>
                </h2>

                <p className=' w-[60%] font-semibold 
                text-center mb-8 '>Studynotion is at the forefront of 
                driving innovation in online education.
                    We're passionate about creating a brighter future 
                    by offering cutting-edge courses,
                    leveraging emerging technologies, and nurturing a
                     vibrant learning community.
                </p>

                <div className=' absolute translate-y-44
                 flex flex-row gap-3 justify-center items-center w-[90%]'>

                    <img src={img1} alt='aboutPic' className=' w-auto 
                    h-auto lg:w-2/6 '/>

                    <img src={img2} alt='aboutPic' className=' w-auto
                     h-auto lg:w-2/6 '/>

                    <img src={img3} alt='aboutPic' className=' w-auto 
                    h-auto lg:w-2/6 '/>


                </div>


            </div>

            




        </section>

        <section className='  gap-8 mt-10 py-10 flex flex-col
         justify-center items-center mx-auto w-11/12'>
            <Quote/>

            <FVM/>


        </section>

        <section className=' bg-richblack-700'>

            <Stats/>

           

        </section>

        <section>

            <Grid/>
            
            <ContactUs heading={"Get in Touch"} desc={`
            We’d love to here for you, Please fill out this form.`}/>


            <div>REVIEW SLIDER</div>

        </section>

        <Footer/>

    </div>
    
  )
}

export default About