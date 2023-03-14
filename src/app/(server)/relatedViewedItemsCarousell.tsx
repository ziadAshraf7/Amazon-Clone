


import { getItems } from '@/api/serverApi';
import Link from 'next/link';
import React from 'react'
import CarouselProvider from '../carouselProvider';
import Image from 'next/image'
import { itemType } from '@/types/types';

async function RelatedViewedItemsCarousell({
  category ,
  mostViews,
  
}: {
  category? : string[] | null ,
  mostViews? : boolean ,
}) {


    let data = (await getItems({
      category : category as string[], 
      bestSeller : true, 
      mostViews : mostViews
    })).items.slice(0,40).map((item : itemType) =>{
      return (
        <div key={item._id} className='w-full  h-full p-2 '>
          <Link aria-label={`go to ${item.title} page`} href={`item/${item._id}`}><Image loading='lazy' blurDataURL = {item.images[0]} width={500} height = {500} alt ='' src={item.images[1]} style = {{width : "100%" , height : "150px" , objectFit : "contain"}} /></Link> 
          <div className='text-xs sm:text-sm  text-cyan-900'>{item.description}</div>
          <div className="rating">
            {new Array(Math.round(item.rating)).fill(undefined).map((_,index) =>{
              return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
            }) }
           </div>
             {item.discountPercentage > 0 && <div className='flex items-center'>
             <div className='line-through'>{Math.round(item.price * (1+(item.discountPercentage / 100))) }$ </div> 
             <div className='ml-4 text-red-800 text-sm'> {item.discountPercentage}% <span className='text-lg font-semibold italic'>OFF</span></div>
            </div>}
          {<div className='text-bold text-3xl text-cyan-900'>{Math.round(item.price)}$</div>}
        </div>
      )
    })


  return (
              <CarouselProvider height = {"100%"} items = {data}  >
                <hr></hr>
                <div className='flex w-full pt-5 justify-between pb-3'>
                   <div className='text-lg sm:text-xl font-semibold'>related to items you've viewed</div>
                    <Link href={`/items?category=${category}`} className='text-cyan-500 cursor-pointer'>see more</Link>
                </div>
                </CarouselProvider>
  )
}

export default RelatedViewedItemsCarousell
