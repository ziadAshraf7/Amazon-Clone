
'use client'



import Link from 'next/link'
import React, { useState } from 'react'
import FastPreviewModal from './fastPreviewModal'
import Image from 'next/image'
import { itemType } from '@/types/types'



function Item({
    brand ,
    category ,
    description ,
    discountPercentage,
    price ,
    stock,
    title ,
    globalRatings ,
    views ,
    rating,
    orders ,
    images ,
    id, 
    sponsored 
}:itemType) {

  let [fastPreviewItem , setFastPreviewItem] = useState<any>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const toggleVisible = () => {
    setVisible(!visible)
  }
  return (
    <>
       <FastPreviewModal visible = {visible} toggleVisible = {toggleVisible} fastPreviewItem = {fastPreviewItem} />
      <div className='flex w-full sm:flex-col bg-white p-2  h-full border-[1px] border-black-100'>
          <Link className='w-[50%] pr-5 sm:p-0 sm:w-full' prefetch = {false} href = {`/item/${id}`}><Image width={500} height = {500} loading='lazy' blurDataURL = {images[0]} alt=''   className='object-contain  sm:w-full sm:bg-cover sm:object-fill sm:h-[200px]' src={images[0]} /></Link> 
         
        <div className='w-[50%] sm:w-full flex flex-col h-full'>
          <div className='basis-full'>

          {sponsored &&<div className="tooltip" data-tip="You’re seeing this ad based on the product’s relevance to your search query. ">
            <div className='text-xs hover:text-orange-400'>Sponsored </div>
          </div>}

          <div className='text-sm sm:text-lg font-semibold'>{title}</div>
          <div className='text-xs sm:text-xs whitespace-normal	 sm:text-sm'>{description}</div>
          <div className='rating rating-sm'>
          {new Array(Math.round(rating)).fill(undefined).map((_ , index) =>{
              return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
            }) }
          </div>
          {discountPercentage > 0 &&<div className='bg-red-700 w-fit p-1 text-white font-semibold text-xs'>Save {discountPercentage}% </div> } 
         
        </div>  
          <div>

          <div className='flex justify-between items-center my-5'>
              {<div className='text-3xl text-grey-500 font-semibold'> {price}$ </div> } 
              {(stock > 10) && <div className='text-xs sm:text-sm font-semibold text-green-800'>In Stock</div>}
              {stock < 0 && <div className='text-xs sm:text-sm font-semibold text-red-800'>Out of Stock</div>}
              {stock < 10 && <div className='text-xs sm:text-sm font-semibold text-red-800'>Only {stock} in Stock</div>}
          </div>

          <button onClick={() => {
            setFastPreviewItem({
                                brand ,
                                category ,
                                description ,
                                discountPercentage,
                                price ,
                                stock,
                                title ,
                                globalRatings ,
                                views ,
                                rating,
                                orders ,
                                images ,
                                id, })
                                toggleVisible()
                              }} 
                                className='btn text-gray-600 border-none btn-sm bg-gradient-to-r from-[#F5F7FA] to-[#F5F7FA] w-full mx-auto' >Fast Preview</button>
          </div>
         </div>
        </div>
      </>

  )
}

export default Item
