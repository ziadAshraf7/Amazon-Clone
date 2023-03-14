


'use client'

import { commentType } from '@/types/types'
import { SERVERURL } from '@/uttils/jsUtills'
import React, { useState } from 'react'
import { Modal, Button } from 'react-daisyui'
import useSWR , {  useSWRConfig } from 'swr'

function EditReviewModal({
    visible ,
    toggleVisible ,
    reviewId

}:{
    visible : boolean ,
    toggleVisible : any , 
    reviewId : string | undefined
}) {

    let [rating , setRating] = useState(1)
    let [review , setReview] = useState("")
    let {data :userReviews } = useSWR("user/reviews")
    const { mutate } = useSWRConfig()

async function updateReview(){

  let commentBody = {
    comment:review ,
    rating : rating ,
    reviewId : reviewId ,
  }
  mutate(`user/reviews` , userReviews.map((review : commentType) => {
    if(review._id == reviewId){
      return {...review , ...commentBody , updated_at : (new Date()).toJSON()}
    }
    return review
  }))
   fetch(SERVERURL+`/api/userReviews` , {
    method : "PATCH" , 
    body : JSON.stringify(commentBody)
})
}


  return (
    <Modal className='m-0 p-4 max-w-xl' open={visible}>

   <Modal.Actions className='m-0'>
      <Button className='btn-sm' onClick={toggleVisible}>X</Button>
    </Modal.Actions>

    <Modal.Body >
      <form className='w-full flex flex-col items-center ' onSubmit={(e) => {
        e.preventDefault()
                updateReview()
                toggleVisible()
                }}>
        <textarea required onChange={(e) => setReview(e.target.value)} className='textarea textarea-warning w-[80%] h-[200px]'></textarea>
        <div className='flex py-4 items-center gap-2'>
          <div className='font-semibold'>select your rating :</div>
          <select value={rating} onChange={(e) => setRating(+e.target.value)} className="select select-bordered select-xs "  >
                          <option disabled selected> Customer Review </option>
                          {new Array(5).fill(null).map((_ , index) => <option key={index} value={index + 1}>{index + 1}</option>)}
                      </select>
                 </div>
            {<button type='submit'  className='btn btn-sm btn-warning'>Update review</button>}
                </form>
    </Modal.Body>


  </Modal>
  )
}

export default EditReviewModal









