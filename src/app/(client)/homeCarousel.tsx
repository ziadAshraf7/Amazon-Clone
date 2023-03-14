

'use client'

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";


function HomeCarousel() {

    const imgs = [ "61qpar9ypbL._SX3000_.jpg","61PobyJf2UL._SX3000_.jpg" , "61S7anSm3yL._SX3000_.jpg" , "6113oQs7JZL._SX3000_.jpg" , "7106h2p5WTL._SX3000_.jpg"]

  return (
    <div className='w-full h-[280px] sm:h-[600px] relative z-0'>
     <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper "
      >
        {imgs.map((img , index) => <SwiperSlide key={index} ><img alt='' className='bg-cover w-full h-full' src={`/${img}`}  /></SwiperSlide> )}
      </Swiper>
    </div>
  )
}

export default HomeCarousel


