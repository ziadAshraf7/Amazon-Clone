
'use client'

import React from 'react'
import  { FreeMode, Navigation, Thumbs } from 'swiper'
import  {useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Modal, Button } from 'react-daisyui';
import Image from 'next/image'
import { itemType } from '@/types/types';

function FastPreviewModal({
    fastPreviewItem , 
    visible ,
    toggleVisible
}:{
    fastPreviewItem : itemType ,
    visible : boolean ,
    toggleVisible : () => void
}) {
  
  return (
    <Modal className='max-w-4xl p-0' open={visible}>
       <Modal.Body >

          <Modal.Actions className='m-0 pt-2 pr-2'>
              <Button className='btn-xs' onClick={toggleVisible}>X</Button>
            </Modal.Actions>

        <div className='w-[95%] sm:w-[85%] mx-auto flex flex-col items-center justify-center p-4'>
          <Swiper
              spaceBetween={1}
              navigation={true}
              style = {{ height : "200px" , marginBottom : 5}}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
              >
              {fastPreviewItem?.images?.map((img : string , index:number) => {
                return  <SwiperSlide key={index}><Image  alt=''width={500} height = {500} loading='lazy' blurDataURL = {img} className='object-contain w-full h-full' src={`${img}`}  /></SwiperSlide>
              }
              )}
          </Swiper>


            <div className='w-full mt-10'>
              <div className='w-full sm:w-[80%] mx-auto'>
                <div className='w-full py-1 flex justify-between '>
                  <div className='text-sm font-semibold'>{fastPreviewItem?.title}</div>
                  <div className='rating rating-sm '>
                  {new Array(Math.round(fastPreviewItem?.rating || 0)).fill(undefined).map((_,index) =>{
                 return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
                }) }
                <span className='italic text-xs'>Of 5</span>
             </div>
                </div>
                <div className='text-cyan-900 text-xs sm:text-sm'>{fastPreviewItem?.description}</div>
                <div className='text-xs sm:text-sm py-1 italic font-semibold'>glopal Ratings : {fastPreviewItem?.globalRatings}</div>
                <div className='w-full flex justify-between'>
                  <div className='text-xs'>Sold By : <span className='font-semibold text-cyan-800'>{fastPreviewItem?.brand}</span></div>
                  {(fastPreviewItem?.stock > 10) && <div className='text-xs sm:text-sm font-semibold text-green-800'>In Stock</div>}
              {fastPreviewItem?.stock < 0 && <div className='text-xs sm:text-sm font-semibold text-red-800'>Out of Stock</div>}
              {fastPreviewItem?.stock < 10 && <div className='text-xs sm:text-sm font-semibold text-red-800'>Only {fastPreviewItem?.stock} in Stock</div>}
                </div>
                <hr></hr>
                <div className='w-full my-2 flex justify-between'>
                  {<div className='text-xl text-grey-500 font-semibold'> {fastPreviewItem?.price}$ </div> } 
                  {fastPreviewItem?.discountPercentage > 0 && <div className='text-red-600'>{fastPreviewItem?.discountPercentage}% <span className='text-semibold text-black italic'>Off</span></div>}
                </div>
             
              </div>
            </div>

            </div>
        </Modal.Body>


      </Modal>
  )
}

export default FastPreviewModal



