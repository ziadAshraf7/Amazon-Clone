

'use client';

import { usePathname } from 'next/navigation';
import React, { ReactElement } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper";


function CarouselProvider({
    items ,
    bg ,
    children,
    height
}:{
    items : ReactElement[] ,
    bg? : string
    children : React.ReactElement ,
    height? : string
}) {
  let pathName = usePathname()



    if(pathName == "/userReviews" || pathName == "/login" || pathName == "/signup" || pathName == "/comment" || pathName?.includes("itemReviews") || pathName == "/browserHistory"){
      return <></>
    }
  return (
  <div className={`bg-${bg} p-4 w-full`}>
       {children}
      <Swiper
        style={{height : height || "fit"}}
        slidesPerView={2}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 1,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
        modules={[Autoplay, Pagination, Navigation]}
      >
       {items.map((item , index) =>  <SwiperSlide key={index} className='text-start '> {item} </SwiperSlide>)}
      </Swiper>
    </div>
  )
}

export default CarouselProvider










