import React from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,Navigation, Pagination}  from 'swiper'
import CARD_COURSE from './CARD_COURSE'


const CategorySlider = ({data}) => {
  return (
    <div>

      {
        data?.length !== 0 ? (
          <div className=' w-full '>
            <Swiper
                    slidesPerView={3}
                    loop={true}
                    spaceBetween={200}
                    pagination={true}
                    modules={[Autoplay,Pagination,Navigation]}
                    className="mySwiper"
                    
                    autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    }}
                    navigation={true}
                    breakpoints={{
                      1024:{slidesPerView:3}
                  }}
                >
              
              {
                data?.map((course,index)=>{
                  return(
                    <SwiperSlide key={index} className='mr-0'>
                        <CARD_COURSE data={course}></CARD_COURSE>
                    </SwiperSlide>
                  )
                }) 
              }

            </Swiper>
          </div>
        )
        :
        (<p className=' w- full text-center font-semibold text-richblack-200 underline underline-offset-4'>
          No Courses Found</p>)
      }

    </div>
  )
}

export default CategorySlider