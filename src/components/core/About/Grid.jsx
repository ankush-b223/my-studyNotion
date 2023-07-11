import React from 'react'
import CTAButton from '../Home/CTAButton';
import HighlightText from '../Home/HighlightText';

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];


const Grid = () => {
  return (
    <div className=' grid lg:grid-cols-4 w-11/12 mx-auto 
    mt-20 py-3 mb-8'>

        {
            LearningGridArray.map((card,index)=>{
                return(
                    <div className={` ${index === 0 && `lg:col-span-2 
                    lg:h-[280px] p-5`}  ${
                        card.order %2 ===1 ? ` bg-richblack-700 lg:h-[280px] p-5` :
                        ` bg-richblack-800 lg:h-[280px] p-5`
                    }
                     ${ card.order ===3 && `lg:col-start-2`}
                     ${card.order <0 &&     ` bg-transparent`}
                    
                    
                    
                    `} key={index}>

                        { card.order <0 ? (<div className=' flex flex-col gap-3
                        lg:w-[90%] pb-5'>
                                <p className='text-4xl font-semibold'>
                                    {card.heading}
                                    <HighlightText text={card.highlightText}/>
                                </p>

                                <p className=' font-medium'>{card.description}</p>
                                <div className=' w-fit mt-4'>
                                    <CTAButton active={true} link={"/signup"}>
                                        Learn more</CTAButton>
                                </div>

                            </div>
                            )
                            :
                            (<div className=' flex flex-col gap-8 p-7'>

                                <h1 className='text-richblack-5 
                                text-lg font-bold
                                '>
                                    {card.heading}
                                </h1>
                                <p className='text-richblack-300 text-sm font-semibold'>
                                    {card.description}
                                </p>


                            </div>
                            )
                        }


                    </div>
                )
            })
        }

    </div>
  )
}

export default Grid