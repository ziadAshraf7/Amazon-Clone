


'use client'

import { useRouter, useSearchParams , usePathname} from 'next/navigation'
import React from 'react'
import useSWR  from 'swr'
import { commentType } from '@/types/types'

function ItemReviews({itemId , ratingFilter } : {
    itemId : string ,
    ratingFilter : string | undefined
}) {


    let router= useRouter()
    let searchParams = useSearchParams()
    let pathName = usePathname()

    let {data :itemReviews } = useSWR(["api/itemReviews" , itemId])


    let ratingFilteredItems = (ratingFilter && ratingFilter !== "All") ?  itemReviews.filter((review : any) => review.rating == ratingFilter) : null

  return (
    <div className='py-4'>


    {itemReviews.length == 0 && <div className='text-lg w-full font-semibold text-center'>No Reviews are Found</div>}

    {itemReviews.length > 0 && <div>
      <div className='flex py-8 sm:py-3 justify-between sm:justify-start sm:gap-8'>
                <select  onChange={(e) => router.push(`${pathName}?rating=${e.target.value}`) } value={searchParams.get("rating") || ""} className="select select-bordered select-sm"  >
                        <option  disabled selected>Avg Customer Review </option>
                        <option  value={"All"}>All Stars</option>
                        {new Array(5).fill(null).map((_ , index) => <option key={index} value={index + 1}>{index + 1}</option>)}
                </select>

                <select  onChange={(e) => router.push(`${pathName}?sort=${e.target.value}`) } value={searchParams.get("sort") || ""} className="select select-bordered select-sm"  >
                    <option disabled selected value={""}>sort by</option>
                    <option value={"topReviews"}>Top Reviews</option>
                    <option value={"mostRecent"}>Most Recent</option>
                </select>
            </div>
            {((!searchParams.has("sort") && !searchParams.has("rating") || searchParams.get("rating") == "All")) && <div>Top Reviews</div>}

            {searchParams.has("sort") &&<div className='text-gray-500 pb-2 text-sm'>
              {searchParams.get("sort") == "topReviews" && <div>Top Reviews</div>}
              {searchParams.get("sort") == "mostRecent" && <div>Most Recent Reviews</div>}
              </div>}
            {(searchParams.has("rating") && searchParams.get("rating")!== "All" )  &&<div className='text-gray-500 pb-2 text-sm'>Reviews are filtered with rating of ({searchParams.get("rating")})</div>}

      <hr></hr>
      
        <div className='mt-5'>
            {(ratingFilteredItems || itemReviews).map((review : commentType ) =>{
               return <div key={review._id} className='mb-10 py-4 border-b-[1px] border-grey-200'>
                                <div className='flex gap-2'>
                      <img  alt='' style={{width : 30 , height : "30"}} src = {"/user.png"}  />
                      <div className='text-lg font-semibold'>{review?.author?.name}</div>
             </div>

             <div className='rating rating-sm flex items-center '>
                {new Array(Math.round(review.rating)).fill(undefined).map((_,index) =>{
              return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
                  }) }
             </div>

             {(review?.created_at == review?.updated_at) && <div className='text-sm text-gray-500'>Reviewed in {review?.created_at}</div>}
             {review?.created_at !== review?.updated_at &&  <div className='text-sm text-gray-500'>Updated in {review?.updated_at}</div>}
             <div className='text-sm'>{review.comment}</div>
                </div>
            })}

            </div>

        </div>}



    </div>
  )
}

export default ItemReviews

















