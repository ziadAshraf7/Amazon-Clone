

'use client';


import React from 'react'
import { SWRConfig, unstable_serialize } from 'swr'

function SwrProvider({
  itemReviews,
  itemId,
    children
}:{
  itemReviews : any ,
  itemId :  string
    children : React.ReactNode
}) {
  return (
    <SWRConfig value={{fallback : {
        [unstable_serialize(['api/itemReviews', itemId])] : itemReviews , 
    }}}>
        {children}
    </SWRConfig>
  )
}

export default SwrProvider











