






import { getItems } from '@/api/serverApi'
import Link from 'next/link'
import React from 'react'
import CarouselProvider from '../carouselProvider'
import Image from 'next/image'
import { itemType } from '@/types/types'
import getUserSession from '@/uttils/session'

async function BrowserHistoryCarousell({
  categoryName ,
  mostViews , 
  bestSeller
}:{
  categoryName : string ,
  mostViews? : any , 
  bestSeller? : any
}) {
    let session = await getUserSession()

    const data = (await getItems({
        category : categoryName ,
        mostViews : mostViews ? mostViews : undefined ,
        bestSeller : bestSeller ? bestSeller : undefined ,
      })).items.map((item : itemType) =>{
        return (
                   <Link aria-label={`go to ${item.title} page`} key={item._id} className='w-full h-[200px]'  href={`/item/${item._id}`}>
                      <Image loading='lazy' blurDataURL = {item.images[0]} width={500} height = {500} alt=''  className='object-contain w-full h-[150px]' src = {item.images[0]} />
                  </Link> 
        )
    })


    if(session.browserHistory?.length == 0){
        return <></>
    }

  return (
        <CarouselProvider items={data}  >
           <div className='text-lg sm:text-xl py-3 font-semibold'>inspired from your browsing History</div>
        </CarouselProvider>
  )
}

export default BrowserHistoryCarousell










