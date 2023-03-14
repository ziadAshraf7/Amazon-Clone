



'use client';


import React from 'react'
import { calcRatingPercentage } from '@/uttils/jsUtills';
import Image from 'next/image'
import { itemType } from '@/types/types';


function ItemDetails({
    item
}:{
    item : itemType
}) {


    if(!item){
        return <div className='w-fit mx-auto p-3 text-xl'>No Item Found</div>
    }

  return (
    <div className='pb-2'>
    <div className='sm:pr-3 pb-2 text-gray-600'>{item.description.slice(0,50)}...{">"} <span className='text-orange-500'>Customer Reviews</span></div>
    <div className='flex flex-col gap-3 items-center sm:flex-row sm:items-start'>

        <div className='w-full  sm:w-[20%]'>
            <div className='text-lg font-semibold'>Customer reviews</div>
            <div className='rating rating-sm '>
                  {new Array(Math.round(item.rating)).fill(undefined).map((_,index) =>{
                 return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
                }) }
             </div>
             <div>{item.globalRatings} glopal ratings</div>


             <div className='w-full py-3'>
                        {new Array(5).fill(null).map((_,i) =>{
                        let percentage = calcRatingPercentage(i+1 , item)
                        return (
                            <div key={i} className='flex hover:text-orange-400 w-full cursor-pointer'>
                            <div className='whitespace-nowrap w-[10%] font-semibold text-xs'>{i+1} Star</div>
                            <div className={`mr-1 mx-3 relative w-fit w-full bg-orange-100 mb-2 h-[20px]`}>
                            <div style = {{width : percentage}} className={`absolute h-full bg-orange-300 top-0 left-0 `}></div>
                            </div>
                            <div className='whitespace-nowrap w-[10%] font-semibold text-xs'>{percentage.toFixed(2)}%</div>
                            </div>
                        )
                        })}
                 </div>

        </div>


        <div className='w-full ml-4 sm:w-[70%]'>

            <div className='flex w-full'>
                        <Image width={500} height = {500} loading='lazy' blurDataURL = {item.images[0]} alt='' className='object-contain w-[200px] mr-2 h-full' src={item.images[0]}/>
                        <div>
                            <div className='text-xs sm:text-xl text-cyan-600'>
                                {item.description}
                            </div>
                            <div className=' py-3'>By : <span className='font-semibold'>{item.brand}</span></div>
                        </div>
            </div>

        </div>

     </div>
     </div>
  )
}

export default ItemDetails






