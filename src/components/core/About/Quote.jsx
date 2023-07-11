import React from 'react'
import HighlightText from '../Home/HighlightText'
import Highlight from './Highlight'

const Quote = () => {
  return (
    <div className=' text-richblack-100 font-bold text-center text-2xl w-[80%] mt-16'>

        <p>We are passionate about revolutionizing the way we learn.
          Our innovative platform
          <HighlightText text={" combines technology"}/>,<Highlight text={" expertise "}/>
          and community to create an <Highlight text={"unparalleled educational experience."}/> </p>

    </div>
  )
}

export default Quote