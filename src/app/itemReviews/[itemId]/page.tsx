import { getItem } from '@/api/serverApi'

import React from 'react'
import CurrentUserReview from '../(client)/currentUserReview'
import ItemDetails from '../(client)/itemDetails'
import ItemReviews from '../(client)/itemReviews'
import SwrProvider from '../(client)/swrProvider'
import TopReviews from '../(client)/topReviews'
import Image from 'next/image'
import getUserSession from '@/uttils/session'
import { SERVERURL } from '@/uttils/jsUtills'

async function getItemReviews(itemId : string , query : string){
    return await (await fetch(SERVERURL+`/api/itemReviews/${itemId}?${query}`)).json()
}

async function Page({
    params , 
    searchParams
}: {
    params : {
        itemId : string 
    } , 
    searchParams : {
      sort : string , 
      search : string , 
      rating : string
    }
}) {


    let {itemId} = params
    let item = await getItem(itemId)
    let itemReviews =  await getItemReviews(itemId , `sort=${searchParams?.sort !== undefined ? searchParams.sort : "topReviews"}`)


    let positiveReview = await getItemReviews(itemId , "search=topReview")
    let criticalReview = await getItemReviews(itemId , "search=criticalReview")
    let session = await getUserSession()

  if(item.message || !item){
    return <div className='text-xl w-fit mx-auto p-4'>No Item Found</div>
  }
  return (

    <SwrProvider itemId = {itemId} itemReviews = {itemReviews} >
      <div className='p-2 sm:p-4'>
    <ItemDetails item = {item} />
      <hr></hr>
     {<TopReviews 
        positiveReview={positiveReview[0]}
        criticalReview = {criticalReview[0]}
        />}
            <Image quality={100} width = {500} height = {500} className = 'object-contain w-[200px] h-[200px] sm:w-full mx-auto py-5 sm:h-[400px] ' alt='' src={"/0ea7edfe4a1b960cf5bff0286b8c883d.jpg"} />
            <CurrentUserReview item={item} session={session} />
            <ItemReviews ratingFilter = {searchParams?.rating} itemId={itemId} />
            </div>
      </SwrProvider>
  )
}

export default Page










