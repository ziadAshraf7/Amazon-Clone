
'use client';

import React from 'react'
import Image from 'next/image'

function CartAlert({
    item ,
} : {
    item : any , 
}) {


    if(!item){
        return <></>
    }

  return (
    <div className='mb-3 bg-white p-5 border-l-5 border-yellow-500 border-y-1 border-yellow-500 border-r-1 border-yellow-500 rounded-xl border'>
        <div className='flex gap-3 items-center pb-6'>
                <Image width={500} height = {500} loading='lazy' blurDataURL = {"/pngwing.com (3).png"} alt='' src='/pngwing.com (3).png' style={{width : 20 , height : 20}} />
                <div className='text-xl font-semibold '>Important messages about items in your Cart:</div>
        </div>
        <div className='text-sm'>We're sorry. You've requested more of {item.description}, than the {item.stock} available from the seller you've selected.</div>
    </div>
  )
}

export default CartAlert








