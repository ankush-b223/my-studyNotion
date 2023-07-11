import React from 'react';
import CTAButton from './CTAButton';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';


const CodeBlock = ({flexDirection , heading , paragraph , ctaBtn1 , ctaBtn2 ,
     code , codeColor , gradientColor}) => {

  return (
    <div className={` ml-4 flex ${flexDirection} gap-10 mt-6 my-20 justify-between`}>

        <div className='flex flex-col w-[50%] gap-8 py-1'>
            <div>{heading}</div>
            <p className=' text-richblack-300 font-bold
                text-lg '>
                {paragraph}
            </p>
            
            <div className=' flex flex-row gap-6 
              '>
                <div className='flex flex-row w-fit'>
                    <CTAButton active={ctaBtn1.active} link={ctaBtn1.link}>
                        <div className='flex gap-2 items-center'>
                            {ctaBtn1.text}<FaArrowRight/>
                        </div>
                         
                    </CTAButton>
                </div>
                
                <CTAButton active={ctaBtn2.active} link={ctaBtn2.link}>
                    {ctaBtn2.text}
                </CTAButton>
            </div>
        </div>



        <div className='flex flex-row lg:w-[500px] h-fit mt-7'>

            <div className='flex flex-col w-[10%]
             text-center text-richblack-400 font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>

            </div>

            <div className={` flex flex-col font-mono font-bold
             gap-2 ${codeColor} pr-2`}>
                <TypeAnimation
                    style={{
                        whiteSpace:"pre-line",
                        display:"block",
                    }}

                    sequence={[code,2000,""]}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                />
            </div>

        </div>

    </div>
  )
}

export default CodeBlock