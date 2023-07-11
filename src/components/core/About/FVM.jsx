import React from 'react';
import img from "../../../assets/Images/FoundingStory.png"
import HighlightText from '../Home/HighlightText';

const FVM = () => {
  return (

    <div className=' w-[100%] flex flex-col items-center justify-center gap-4 mx-auto
     text-richblack-300 mt-20'>


        <div className=' flex flex-row justify-around items-center w-[100%] mx-auto' >

            <div className=' flex flex-col justify-center w-[40%] gap-2 mb-10' >
                <h3 className=' w-[70%] items-start font-bold text-2xl py-2
                 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]
                 text-transparent bg-clip-text'>
                    Our Founding Story</h3>
                <p className=' text-sm '>Our e-learning platform was born out of a shared vision and passion for 
                    transforming education.
                     It all began with a group of educators, technologists, and lifelong
                      learners who recognized
                      the need for accessible, 
                    flexible, and high-quality learning opportunities in a rapidly evolving 
                    digital world.
                    <br/>
                    As experienced educators ourselves, we witnessed firsthand the limitations and
                     challenges of traditional education systems. We believed that education should not be 
                     confined to the walls of a classroom or restricted by geographical boundaries. 
                     We envisioned a platform that could bridge these gaps
                     and empower individuals from all walks of life to unlock their full potential.
                </p>
            </div>
            <div className=' w-[40%]'>
                <img src={img} alt='founder'/>
            </div>

        </div>

        <div className=' flex flex-row justify-around items-center w-[100%] mx-auto'>

            <div className=' flex flex-col justify-center w-[40%] gap-2'>
                <header className=' w-[60%] items-start font-bold text-2xl py-2 
                bg-gradient-to-r from-[#E65C00]  to-[#F9D423]
                text-transparent bg-clip-text'>Our Vision</header>
                <p className=' text-sm '>With this vision in mind, we set out on a
                 journey to create an e-learning
                     platform that would revolutionize the way people learn.
                      Our team of dedicated
                      experts worked tirelessly to develop a robust and
                       intuitive platform that combines 
                      cutting-edge technology
                     with engaging content, fostering a dynamic and 
                     interactive learning experience.</p>
            </div>
            <div className=' flex flex-col justify-center w-[40%] gap-2'>
                <header className=' w-[60%] items-start font-bold text-2xl py-2 '>
                    <HighlightText text="Our Mission"/>
                </header>
                <p className=' text-sm '>
                our mission goes beyond just delivering courses online.
                 We wanted to create a 
                vibrant community of learners, where individuals can connect, 
                collaborate, and learn 
                from one another. We believe that knowledge thrives in an
                 environment of sharing and dialogue, 
                and we foster this spirit of collaboration through forums, live sessions,
                 and networking opportunities.
                </p>
            </div>

        </div>


    </div>
  )
}

export default FVM