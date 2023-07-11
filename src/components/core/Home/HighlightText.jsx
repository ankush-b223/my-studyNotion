import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className=' font-bold 
    bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]
     text-transparent bg-clip-text'>
        {" "}
        {text}
    </span>
  )
}

export default HighlightText