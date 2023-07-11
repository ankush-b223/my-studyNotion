import React from 'react'
import Details from '../components/core/Contact/Details'
import ContactUs from '../components/common/ContactUs'
import Footer from '../components/common/Footer'

const Contact = () => {
  return (
    <div>

        <section className=' mt-10 flex flex-row w-11/12 
        justify-start items-start gap-10 mx-auto mb-10'>

            <Details/>

            <ContactUs heading={`Got a Idea? We've got
             the skills. Let's team up`} desc={`Tall us more about yourself
              and what you're got in mind.`}/>

        </section>

        <div className=' text-richblack-5 mb-5'>
            Review Slider
        </div>

        <Footer/>


    </div>
  )
}

export default Contact