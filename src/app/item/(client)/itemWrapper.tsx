'use client';

import { itemType } from '@/types/types';
import { SERVERURL } from '@/uttils/jsUtills';
import React, { useEffect } from 'react'

function ItemWrapper({
    children,
    body
}:{
    children : React.ReactElement
    body : itemType
}) {


    useEffect(() =>{
        fetch(SERVERURL+"/api/session" , {
            method : "POST" , 
            body : JSON.stringify({
              type : "browserHistory" ,
              ...body
            })
          })
    },[body])


  return (
    <>
      {children}
    </>
  )
}

export default ItemWrapper
