
'use client'


import { calcRatingPercentage } from '@/uttils/jsUtills';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import  useSWR  from 'swr';
import Image from 'next/image'
import { commentType } from '@/types/types';
import { Session } from 'next-session/lib/types';

function ItemReviews({
    session,
    itemid
}:{
    session : Session ,
    itemid : string
}
) {
  let router = useRouter()

  let {data :item } = useSWR(["api/item" , itemid])


  return (
    <div className='flex flex-col sm:flex-row'>

     <div className='p-4 bg-white'>

            <div className='text-lg sm:text-2xl font-semibold'>
               Customer reviews
            </div>
            <div className='rating rating-sm flex items-center '>
                {new Array(Math.round(item.rating)).fill(undefined).map((_ , index) =>{
                   return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
                  }) }
                  <span className='text-sm sm:text-md font-bold ml-3'>{item.rating.toFixed(2)} of 5</span>
             </div>
                  <div className='text-xs sm:text-sm font-semibold text-gray-500'>{item.globalRatings} glopal rating</div>
                  
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
                  
                   <div className='mt-10'>
                    <div className='font-semibold text-lg pb-1'>Review this product</div>
                    <div className='text-gray-500 pb-2 text-sm'>Share your thoughts with other customers</div>
                    {<button onClick={() => session.name ? router.push(`itemReviews/${item._id}`) : router.push("/login")} className='w-[70%] sm:w-[90%] btn btn-warning btn-xs  sm:btn-sm'>Write a customer review</button>}
                  </div>
        </div>


        <div className='p-5'>
            <div className='text-sm sm:text-lg font-bold pb-3'>Top reviews of {item.title}</div>
                    {item.comments.length == 0 && <div className='text-xs sm:text-md text-gray-600 '>There are no reviews for this product yet</div>}
                    {item.comments.length > 0 && <div>
                {item.comments.slice(0,10).map((comment : commentType , index:number) =>{
                  return (<div key={index} className='py-4'>
                    <div className='flex gap-2'>
                      <Image width={500} height = {500} loading='lazy' blurDataURL = {"/user.png"} alt='' style={{width : 30 , height : "30"}} src = {"/user.png"}  />
                      <div className='text-lg font-semibold'>{comment?.author?.name}</div>
                    </div>
                    <div className='rating rating-sm'>
                           {new Array(Math.round(comment.rating)).fill(undefined).map((_,index) =>{
                             return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
                              }) }
                      </div>
                      <div className='text-gray-500'>Reviewed in {comment.created_at}</div>
                      <div>{comment.comment}</div>
                  </div>)
                })}
                {item.comments.length >= 10  && <Link prefetch = {false} href = {`/itemReviews/${item._id}`} className = 'text-cyan-600 text-sm'>see more</Link>}
              </div>}
        </div>

    </div>
  )
}

export default ItemReviews









