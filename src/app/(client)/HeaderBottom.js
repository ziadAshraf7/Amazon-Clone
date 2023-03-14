
'use client'

import { useRouter } from 'next/navigation'

import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import Drawer from 'react-modern-drawer'
import Image from 'next/image'
import Link from 'next/link';


function HeaderBottom({
  Categories
}) {
  let router = useRouter()

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
  }

  return (
    <>
      <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                className='bla bla bla w-80'
            >
                <div className='h-[100px]'></div>
                <hr></hr>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                      <li onClick={() => {
                        router.push("/userReviews")
                        setIsOpen(false)
                        }}><a>my Reviews</a></li>
                      <li onClick={() => {
                        router.push("/browserHistory")
                        setIsOpen(false)
                        }}><a> browsing history</a></li>
                      <li onClick={() => {
                        router.push("/cart")
                        setIsOpen(false)
                        }}><a> Cart</a></li>
              </ul>

            </Drawer>

    <div className='h-[39px] W-[70%] flex pl-2  relative z-0 text-white bg-[#232f3e] '>

      <div  onClick={toggleDrawer} className='flex items-center h-full mr-3 cursor-pointer'>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
        </svg>
      </div>
 <Swiper
        slidesPerView={5}
        pagination={{
          clickable: true,
        }}
        initialSlide = {0}
        breakpoints={{
          640: {
            slidesPerView: 7,
            spaceBetween: 1,
          },
          768: {
            slidesPerView: 7,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 10,
            spaceBetween: 10,
          },
        }}
        grabCursor={true}
        className="mySwiper"
      >
         {Categories.map((item , index) =>{
          return (
            <SwiperSlide key={index} className='bg-[#232f3e] sm:w-fit '> 
               <Link aria-label={`go to ${item.title} page`} href={`${item.title ? `/items?category=${item.title}`:`/items?all=true`}`} 
                   className=' w-fit  text-xs  sm:text-[15px] cursor-pointer font-normal'>{typeof item == "string" ? item : item.title[0].toUpperCase() + item.title.slice(1 , item.title.length)}
                </Link>
             </SwiperSlide>
           
          )
        })}
      </Swiper>
      <div className='w-[30%] hidden sm:block'>
        <Image alt='' width={500} height = {500} className='w-full h-full' src = {"https://m.media-amazon.com/images/G/42/Sunrise/Events/2022/NTAWeclomePage/XCM_Manual_1441675_4773841_400x39_2X._CB634027545_.jpg"} />
      </div>
    </div>
  </>
  )
}

export default HeaderBottom







