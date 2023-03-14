














'use client';


import React from 'react'
import useSWR , {  useSWRConfig } from 'swr'

import { SWRConfig } from 'swr';
function SwrProvider({
    children , 
    userReviews
}:{
    children : React.ReactElement ,
    userReviews : any
}) {


  let {data} = useSWR("user/reviews")


  return (
    <div className={`h-auto`}>
    <SWRConfig value={{fallback : {
      "user/reviews" : userReviews || [] , 
  }}}>
        {children}
    </SWRConfig>
    </div>


  )
}

export default SwrProvider
