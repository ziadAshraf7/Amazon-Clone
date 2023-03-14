




'use client';


import { handleURLRedirection } from '@/uttils/jsUtills'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React  from 'react'
import  {Swiper, SwiperSlide } from 'swiper/react';

function FilterHeader({
  brands
}) {
    let router = useRouter()
    let pathName = usePathname()
    const searchParams = useSearchParams();


  return (
    <>


    <div className='h-[39px] fixed top-150 w-full z-10 shadow-md bg-white flex justify-between items-center px-1'>
      <div className='hidden sm:block'></div>
     
      <div className='block w-full h-full sm:hidden'>
      <Swiper
        slidesPerView={3}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        className="mySwiper"
      >
        <SwiperSlide className='h-full mr-4'>
                <div  className='flex items-center h-full'>
                    <input checked = {searchParams.has("bestseller")} onChange={(e) => {
                        if(e.target.checked) router.push(handleURLRedirection(pathName  , searchParams , {key :"bestseller" , value : undefined , page : searchParams.get("page")}   , undefined))
                        if(!e.target.checked) router.push(handleURLRedirection(pathName  , searchParams , undefined  , "bestseller"))
                        }} className='mr-2' id = {"bestSeller"} type = {"checkbox"} />
                </div>
                <div className='text-xs font-semibold '>best Seller</div>
        </SwiperSlide>


        <SwiperSlide >
              <select className="select select-bordered select-xs " value={searchParams.get("rating") || ""} onChange={(e) => router.push(handleURLRedirection(pathName  , searchParams , {key : "rating" , value : e.target.value , page : searchParams.get("page")} , undefined))} >
                  <option value = {""} disabled selected>Avg Customer Review </option>
                  <option value = {"All"}>All start</option>
                  {new Array(5).fill().map((_ , index) => <option key={index} value={index + 1}>{index + 1}&up</option>)}
          </select>
        </SwiperSlide>


        {brands.length > 0 && <SwiperSlide >
              { <select className="select select-bordered select-xs " value={searchParams.get("sort") || ""} onChange={(e) => router.push(handleURLRedirection(pathName  , searchParams , {key : "sort" , value : e.target.value , page : searchParams.get("page")} , undefined))} >
                <option value = {""} disabled selected>Brands</option>
                {brands.map(brand =><option key={brand} value={brand}>{brand}</option>)}
            </select>}
        </SwiperSlide>}

          
        <SwiperSlide >
          <div className='flex  items-center'>
                        <input  checked = {searchParams.has("offer")} onChange={(e) => {
                                                    if(e.target.checked) router.push(handleURLRedirection(pathName  , searchParams , {key : "offer" , value : undefined , page : 0}  , undefined))
                                                    if(!e.target.checked) router.push(handleURLRedirection(pathName  , searchParams , undefined  , "offer"))
                        }} className='mr-2' id = {"offer"} type = {"checkbox"} />
                  <div className='text-xs font-semibold'>Offers</div>
              </div>
        </SwiperSlide >
                        <SwiperSlide >
                        <select className="select select-bordered select-xs  " value={searchParams.get("sort") || ""} onChange={(e) => router.push(handleURLRedirection(pathName  , searchParams , {key : "sort" , value : e.target.value , page : searchParams.get("page")} , undefined))} >
                            <option value = {""} disabled selected>Sort By</option>
                            <option value={"low"}>Low to High</option>
                            <option value={"high"}>High to Low</option>
                            <option value={"rating"}>Avg. Customer Review</option>
                      </select>
                        </SwiperSlide>
      </Swiper>
      </div>



    <select className="select select-bordered select-xs w-[100px] sm:w-fit block " value={searchParams.get("sort") || ""} onChange={(e) => router.push(handleURLRedirection(pathName  , searchParams , {key : "sort" , value : e.target.value , page : searchParams.get("page")} , undefined))} >
            <option value = {""} disabled selected>Sort By</option>
            <option value={"low"}>Low to High</option>
            <option value={"high"}>High to Low</option>
            <option value={"rating"}>Avg. Customer Review</option>
    </select>

    </div>
    </>

  )
}

export default FilterHeader
