



'use client'

import React, { useState } from 'react'
import useSWR , {  useSWRConfig } from 'swr'
import EditReviewModal from './editReviewModal'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SERVERURL } from '@/uttils/jsUtills'

function UserReviewWrapper() {
  let [targetReviewId , setTargetReviewId] = useState<string>()
  const { mutate } = useSWRConfig()
  let {data :userReviews } = useSWR("user/reviews")
  const [visible, setVisible] = useState<boolean>(false)
  let router = useRouter()
  const toggleVisible = () => {
    setVisible(!visible)
  }

  async function deleteReview(reviewId : any){
    mutate("user/reviews"  , userReviews.filter((review : any) => review._id !== reviewId))
    fetch(SERVERURL+`/api/userReviews` , {
      method : "DELETE" , 
      body : JSON.stringify({reviewId : reviewId})
  })
}

  if(!userReviews || userReviews.length == 0){
    return <div className='w-fit mx-auto text-lg font-semibold'>No Reviews For you Yet</div>
  }

  return (
    <div className='grid 	h-full grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-3'>

    <EditReviewModal reviewId={targetReviewId} toggleVisible = {toggleVisible} visible = {visible} />

    {userReviews.map((review : any ) =>{
      return   <div key={review._id} className='p-3 border-[1px]  border-gray-200 flex justify-between gap-2'>
      <div className='w-[30%] h-[200px]'>
          <Image onClick={() => router.push(`item/${review.item._id}`)} width={500} height = {500} loading='lazy' blurDataURL = {review.itemId?.images[0]} alt='' src={review.item?.images[0]} className = 'cursor-pointer object-contain w-full h-full ' />
      </div>
              <div className='w-[70%]'>
                <div className='flex gap-2'>
                        <Image  width={500} height = {500} alt='' style={{width : 30 , height : "30"}} src = {"/user.png"}  />
                        <div className='text-lg font-semibold'>{review?.author?.name}</div>
                      </div>
                      <div className='rating rating-sm'>
                             {new Array(Math.round(review.rating)).fill(undefined).map((_,index) =>{
                               return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
                                }) }
                        </div>
                        {(review?.created_at == review?.updated_at) && <div className='text-sm text-gray-500'>Reviewed in {review?.created_at}</div>}
                        {review?.created_at !== review?.updated_at &&  <div className='text-sm text-gray-500'>Updated in {review?.updated_at}</div>}                 
                        <div>{review.comment}</div>
              </div>
              <div className='gap-2 flex'>
                  <button onClick={() =>{ 
                    setVisible(true)
                    setTargetReviewId(review._id)
                    }} className='btn btn-xs btn-warning '>edit</button>
                  <button onClick={() => deleteReview(review._id)} className='btn btn-xs btn-error '>delete</button>
                </div>
  </div>
    })}
    
    
    </div>
  

  )
}

export default UserReviewWrapper









