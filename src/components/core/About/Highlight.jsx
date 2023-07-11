import React from 'react'

const Highlight = ({text}) => {
  return (

        <span className=' font-bold 
        bg-gradient-to-r from-[#E65C00] via-[#f4da59] to-[#F9D423]
        text-transparent bg-clip-text'>
          {text}
        </span>
    )
}

export default Highlight