
'use client';


import { itemType } from '@/types/types';
import React from 'react'
import { SWRConfig, unstable_serialize } from 'swr'

function SwrProvider({
    item,
    children
}:{
    item : itemType ,
    children : React.ReactNode
}) {
  return (
    <SWRConfig value={{fallback : {
        [unstable_serialize(['api/item', item._id])] : item , 
    }}}>
        {children}
    </SWRConfig>
  )
}

export default SwrProvider










