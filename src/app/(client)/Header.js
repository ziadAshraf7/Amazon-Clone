'use client';

import { usePathname } from 'next/navigation';
import React from 'react'
import HeaderTop from "./HeaderTop"
import HeaderBottom from "./HeaderBottom"
function Header({
  Categories ,
  AllItems ,
  cartItemsCount ,
  user
}) {

  let NewCategories = ["All" , ...Categories]
  let pathName = usePathname()



  if(pathName == "/login" || pathName == "/signup"){
    return <></>
  }

  return (
    <>
   <div className='fixed w-full  z-50'>
    <HeaderTop
      user = {user}
      Categories = {NewCategories}
      AllItems = {AllItems}
      cartItemsCount = {cartItemsCount} 
    />
    <HeaderBottom Categories = {NewCategories} />
   </div>
       <div className="h-[calc(116px+39px)] sm:h-[calc(68px+39px)]"></div>
       </>

  )
}

export default Header
