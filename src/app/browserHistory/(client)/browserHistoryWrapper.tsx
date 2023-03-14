







'use client'




import { deleteFromBrowserHistory } from '@/uttils/jsUtills'
import Link from 'next/link'
import React from 'react'
import useSwr , { useSWRConfig  } from 'swr'
import Image from 'next/image'
import { itemType } from '@/types/types'

function BrowserHistoryWrapper() {
    let {data : browserHistory} = useSwr("user/browserHistory")
    let {mutate} = useSWRConfig()



    function handleBrowserHistoryDelete(id : any){
        mutate("user/browserHistory" , browserHistory.filter((item : any) => item._id !== id))
        deleteFromBrowserHistory(id)
    }


    if(browserHistory.length == 0){
     return <div className='text-center w-full font-semibold text-xl text-gray-500 py-6'>your browser history is empty</div>

    }

  return (
    <div className='grid  grid-cols-2 sm:grid-cols-4 md:grid-cols-6'>
    {browserHistory.map((item : itemType) =>{
       return <div key={item._id} className='border-1  border-gray-400 p-4 gap-5 flex flex-col items-center'>
        <div className='basis-full text-center'>
            <Link className='mb-5' href = {`item/${item._id}`}>
               <Image width={500} height = {500} loading='lazy' blurDataURL = {item.images[0]} alt='' src={item.images[0]} style = {{objectFit : "contain" ,width : 200 , height : 100  }}/>
            </Link>
          <div className=' text-sm sm:text-md font-semibold text-cyan-600'>{item.title}</div>
          <div className='rating rating-sm'>
           {new Array(Math.round(item.rating)).fill(undefined).map((_,index) =>{
                return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
              }) }
               </div>
               {item.discountPercentage > 0 &&<div className='text-sm text-red-600 font-semibold'> {Math.ceil(item.price * (item.discountPercentage / 100))}$ </div> } 
               {item.discountPercentage < 1 &&<div className='text-sm text-red-600 font-semibold'> {item.price}$ </div> }      
               </div>
             
               <button onClick={() => handleBrowserHistoryDelete(item._id)} className='btn btn-error btn-xs text-[9px] sm:text-[12px]'>remove from view</button>
                </div>
             })}
</div>
  )
}

export default BrowserHistoryWrapper


