


'use client'



import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import useSWR , {  useSWRConfig } from 'swr'
import Image from 'next/image'
import { itemType } from '@/types/types'
import { Session } from 'next-session/lib/types'
import { SERVERURL } from '@/uttils/jsUtills'

function CurrentUserReview({
    item , 
    session ,
}:{
    item : itemType , 
    session : Session
}) {
    let router= useRouter()
    let {data :itemReviews } = useSWR(["api/itemReviews" , item._id])
    let [updateReviewStatus , setUpdateReviewStatus] = useState(false)
    console.log(itemReviews)
    let currentUserReview = session.name ? itemReviews?.find((comment : any) => comment.author._id == session._id) : null
    const { mutate } = useSWRConfig()
    let [customerReview , setCustomerReview] = useState(false)
    let [rating , setRating] = useState(1)
    let [review , setReview] = useState("")



    async function updateReview(){
      let date = new Date()
        let reviewId = currentUserReview._id
        let commentBody = {
          comment:review ,
          rating : rating ,
          reviewId : reviewId ,
          userId : session._id ,
          updated_at : date.toJSON()      
        }
        mutate([`api/itemReviews` , item._id] , itemReviews.map((review : any) => {
          if(review._id == reviewId){
            return {...commentBody , author : session}
          }
          return review
        }))
         fetch(SERVERURL+`/api/itemReviews/${item._id}` , {
          method : "PATCH" , 
          body : JSON.stringify(commentBody)
      })
      }


      function handleCustomerReview(){
        if(session.email) return setCustomerReview(true)
        router.push("/login")
      }

    async function deleteReview(reviewId : any){
          mutate(["api/itemReviews" , item._id] , itemReviews.filter((review : any) => review._id !== reviewId))
          fetch(SERVERURL+`/api/itemReviews/${item._id}` , {
            method : "DELETE" , 
            body : JSON.stringify({reviewId : reviewId})
        })
      }

    async function submitReview(){
      let date = new Date()

        let commentBody = {
          comment:review ,
          rating : rating ,
          id : item._id ,
          userId : session._id ,
          created_at : date.toJSON(),
          updated_at : date.toJSON()     
        }
          mutate(["api/itemReviews" , item._id] , [{...commentBody , author : session} , ...itemReviews ])
          fetch(SERVERURL+`/api/itemReviews/${item._id}` , {
            method : "POST" , 
            body : JSON.stringify(commentBody)
        })
      }

  return (
    <div className='flex flex-col  my-5 sm:flex-row sm:justify-between py-4'>
                    
                    {(!currentUserReview && !customerReview) && <button onClick={() => handleCustomerReview()} className='mx-auto btn btn-accent   btn-sm'>Write a customer review</button>}
                   
                    {(customerReview && !currentUserReview )&& <form className='flex w-full items-center flex-col' onSubmit={(e) =>{
                       e.preventDefault()
                       return  submitReview()
                       }}>
                        <textarea required onChange={(e) => setReview(e.target.value)} className='textarea w-full sm:w-[50%] textarea-warning'  ></textarea>
                        <div className='flex items-center py-3'>
                        <div className='font-semibold mr-2'>select your rating :</div>
                        <select value={rating} onChange={(e) => setRating(+e.target.value)} className="select select-bordered select-xs "  >
                          <option disabled selected> Customer Review </option>
                          {new Array(5).fill(null).map((_ , index) => <option key={index} value={index + 1}>{index + 1}</option>)}
                      </select>
                        </div>
                        {<button type='submit' onClick={() => submitReview()} className='btn btn-sm btn-warning'>Submit review</button>}
                    </form>}


        {currentUserReview && <div className='pb-6 min-w-[90%] sm:min-w-[400px]'>
          <div className='flex justify-between '>
              <div className='text-md sm:text-lg font-semibold pb-4'>Your Review in this Product</div>
              <div className='gap-2 flex'>
                <button onClick={() => setUpdateReviewStatus(true)} className='btn btn-xs btn-warning '>edit</button>
                <button onClick={() => deleteReview(currentUserReview._id)} className='btn btn-xs btn-error '>delete</button>
              </div>
          </div>
            <div className='flex gap-2'>
                      <Image width={500} height = {500} loading='lazy' blurDataURL = {"/user.png"} alt='' style={{width : 30 , height : "30"}} src = {"/user.png"}  />
                      <div className='text-lg font-semibold'>{currentUserReview?.author?.name}</div>
             </div>

             <div className='rating rating-sm flex items-center '>
                {new Array(Math.round(currentUserReview?.rating)).fill(undefined).map((_ , index) =>{
              return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
                  }) }
             </div>
             {(currentUserReview?.created_at == currentUserReview?.updated_at) && <div className='text-sm text-gray-500'>Reviewed in {currentUserReview?.created_at}</div>}
             {currentUserReview?.created_at !== currentUserReview?.updated_at &&  <div className='text-sm text-gray-500'>Updated in {currentUserReview?.updated_at}</div>}
             <div className='text-sm'>{currentUserReview?.comment}</div>
        </div>}

        <hr></hr>


       {(updateReviewStatus && currentUserReview) && <form className='flex flex-col items-center' onSubmit={(e) =>{
                       e.preventDefault()
                       return  updateReview()
                       }}>
                        <textarea required onChange={(e) => setReview(e.target.value)} className='textarea textarea-warning'  ></textarea>
                        <div className='flex py-1 items-center'>
                        <div className='py-2 text-xs sm:text-sm text-gray-600 mr-2'>select your rating :</div>
                        <select value={rating} onChange={(e) => setRating(+e.target.value)} className="select select-bordered select-xs "  >
                          <option disabled selected> Customer Review </option>
                          {new Array(5).fill(null).map((_ , index) => <option key={index} value={index + 1}>{index + 1}</option>)}
                      </select>
                        </div>
                        { <button type='submit' className='btn btn-xs  sm:btn-sm btn-warning '>Update review</button>}

                    </form>}
                       <hr></hr>
    </div>
  )
}

export default CurrentUserReview
