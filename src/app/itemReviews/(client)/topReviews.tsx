

'use client'

import React from 'react'
import Image from 'next/image'

function TopReviews({
    positiveReview , 
    criticalReview
}:{
    positiveReview : any, 
    criticalReview : any
}) {



  if(!positiveReview && !criticalReview){
    return <></>
  }

  if(positiveReview.rating == criticalReview.rating){
    return <></>
  }

  return (
    <div className='flex py-2 flex-col items-center sm:flex-row sm:items-start'>
        
        <div className='sm:w-[50%] pb-5'>
            <div className='font-bold text-lg'>Top positive review</div>
            <div className='flex gap-2'>
                      <Image width={500} height = {500}  alt='' style={{width : 30 , height : "30"}} src = {"/user.png"}  />
                      <div className='text-lg font-semibold'>{positiveReview?.author?.name}</div>
             </div>

             <div className='rating rating-sm flex items-center '>
                {new Array(Math.round(positiveReview?.rating)).fill(undefined).map((_,index) =>{
              return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
                  }) }
             </div>

             <div className='text-gray-500'>Reviewed in {positiveReview?.created_at}</div>

             <div className='text-sm'>{positiveReview?.comment}</div>
        </div>
        




        <div className='sm:w-[50%]'>
        <div className='font-bold text-lg'>Top Critical review</div>
            <div className='flex gap-2'>
                      <Image width={500} height = {500} loading='lazy' blurDataURL = {"/user.png"} alt=''  style={{width : 30 , height : "30"}} src = {"/user.png"}  />
                      <div className='text-lg font-semibold'>{criticalReview?.author?.name}</div>
             </div>

             <div className='rating rating-sm flex items-center '>
                {new Array(Math.round(criticalReview.rating)).fill(undefined).map((_,index) =>{
              return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
                  }) }
             </div>

             <div className='text-gray-500'>Reviewed in {criticalReview?.created_at}</div>

             <div className='text-sm'>{criticalReview?.comment}</div>
        </div>
    </div>
  )
}

export default TopReviews
