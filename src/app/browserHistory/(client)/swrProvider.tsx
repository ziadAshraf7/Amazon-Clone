
'use client'
import React from 'react'
import { SWRConfig } from 'swr'

function SwrProvider({
    browserHistory ,
    children
}:{
    browserHistory : any ,
    children : React.ReactNode
}) {
  return (
    <SWRConfig value={{fallback : {
        "user/browserHistory" : browserHistory , 
    }}}>
          {children}
      </SWRConfig>
  )
}

export default SwrProvider





