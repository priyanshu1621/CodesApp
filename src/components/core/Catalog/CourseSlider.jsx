import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import Course_Card from './Course_Card'

// import { Pagination } from 'swiper/modules';

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          freeMode={true}
          // loop={false} // Disable loop mode
          autoplay={{
            delay: 2400,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
