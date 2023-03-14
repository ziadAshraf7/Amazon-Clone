



'use client'


import { userType } from '@/types/types'
import { SERVERURL } from '@/uttils/jsUtills'
import React, { useState } from 'react'

 function Comment({
    itemId ,
    user
} : {
    itemId : string | undefined ,
    user : userType
}) {

    let [comment , setComment ] = useState("")
    let [rating , setRating] = useState(1)

    function handleComment(e : any){
        e.preventDefault()
        fetch(SERVERURL+"/api/comment" , {
            method : "POST" , 
            body : JSON.stringify({
                comment:comment ,
                rating : rating ,
                id : itemId ,
                userId : user._id
            })
        })
    }

  return (
    <div className='flex justify-center p-5'>
        <form onSubmit={handleComment}>       
             <textarea required onChange={(e) => setComment(e.target.value)} cols={40} rows = {20}></textarea>
             <div className='rating rating-sm '>
             <input onClick={() => setRating(1)} type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" checked />
             <input onClick={() => setRating(2)} type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400"  />
             <input onClick={() => setRating(3)} type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" />
             <input onClick={() => setRating(4)} type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" />
             <input onClick={() => setRating(5)} type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" />
             </div>
             <button className='' type='submit'>Submit Comment</button>
        </form>
    </div>
  )
}

export default Comment











