export const dynamic = 'force-dynamic'

import React from 'react'
import { cookies } from 'next/headers';
import SwrProvider from './(client)/swrProvider';
import UserReviewWrapper from './(client)/userReviewWrapper';
import Image from 'next/image'
import { SERVERURL } from '@/uttils/jsUtills';

 async function getUserReviews(){
    let Cookies = cookies()
    let accessToken = Cookies.get(process.env.ACCESSTOKENKEY as string)
    return await (await fetch(SERVERURL+"/api/userReviews" ,{
        headers : {
            cookie : `${accessToken?.name}=${accessToken?.value}`
        }
    })).json()
}

async function Page() {
    let userReviews = await getUserReviews()
    
  return (
    <SwrProvider userReviews = {userReviews} >
            <div className='p-3'>
            <div className='font-bold pb-5 text-2xl'>Your product's reviews</div>
            <Image width = {500} height = {500} className = 'object-contain w-[200px] h-[200px] sm:w-full mx-auto py-5 sm:h-[400px] ' alt='' src={"/0ea7edfe4a1b960cf5bff0286b8c883d.jpg"} />
            <UserReviewWrapper  />
            </div>
    </SwrProvider>

  )
}

export default Page



