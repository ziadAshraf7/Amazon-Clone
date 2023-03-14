

'use client';


import { itemType } from '@/types/types';
import { SERVERURL } from '@/uttils/jsUtills';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react'
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
function AppProvider({
    children ,
    session,
    accessToken ,
    userSession
}: {children : React.ReactElement , session : Session , accessToken : string | undefined , userSession : {cart : itemType[]}}) {


    useEffect(() =>{
        if(!accessToken){
          fetch(SERVERURL+"/api/createsession")
        }
    },[accessToken])

  return (
    <SWRConfig value={{fallback : {
      "api/cart" : userSession?.cart || [] , 
  }}}>
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
    </SWRConfig>

  )
}

export default AppProvider
