
'use client';

import {  signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Select from "react-select";
import Link from 'next/link';
import useSWR from 'swr'
import { getCartItemsCount } from '@/uttils/jsUtills';
import { getItems } from '@/api/serverApi';
import Image from 'next/image'

function HeaderTop({Categories , AllItems  , user}) {
    let router = useRouter()
    let [selectedCategory , setSelectedCategory] = useState("All")
    let [options , setOptions] = useState([])
    let [focusEffect , setFocusEffect] = useState(false)
    let {data : cart} = useSWR("api/cart")

    let cartItemsCount = getCartItemsCount(cart ? cart : [])

 useEffect(() =>{
    let options
    let fetchCategoriesOptions = async () =>{
      options = selectedCategory == "All" ? AllItems : (await getItems({category : selectedCategory.toLowerCase()})).items
      return options
    } 

    fetchCategoriesOptions().then(data =>{
      setOptions(() =>{
        return data.map(item => {
          return {value : item._id , label : item.title}
        })
      })
    })
  },[selectedCategory,AllItems])



  function handleChange(data){
    router.push(`/item/${data.value}`)
  }

  return (
    <>
    {focusEffect && <div onClick={() => setFocusEffect(false)} className='fixed top-[calc(68px+39px)] bg-[#000000b0] h-full w-full'></div>}
   
   <div onClick={() => setFocusEffect(false)} className='bg-[#131921] flex flex-col items-center p-1 '>

    <div className='flex justify-between items-center w-full h-[60px] text-white'>
           <Link prefetch = {false} aria-label = "go to home page" href={"/"}> <Image alt='' width={500} height = {500} style = {{cursor : "pointer"}} className = {"bg-cover w-[90px] h-[25px] sm:w-[113px] sm:h-[30px]"} src={"/PngItem_12080.png"} />
          </Link>
          
    <div onClick={(e) => e.stopPropagation()} className='md:flex items-center h-[40px]  justify-between border-2 border-gray rounded-md text-black hidden sm:hidden   md:w-[50%]  lg:w-[60%] '>
     <select onChange={(e) => setSelectedCategory(e.target.value)} className="text-sm text-gray-800 bg-gray-100 h-full w-16 md:w-fit">
        {Categories.map((item , index) =>{
            return (
                <option key={index} value={item.title} className=' ml-2 text-xs md:text-[15px] cursor-pointer font-normal'>{typeof item == "string" ? item : item.title[0].toUpperCase() + item.title.slice(1 , item.title.length)}</option>
                )
            })}
        </select>
  
    <Select
          options={options}
          placeholder="Search Items"
          isSearchable={true}
          onChange = {handleChange}
          
          className = {"basis-full"}
          onFocus = {(e) => setFocusEffect(true)}
    />   
            <button className=" flex justify-center  items-center h-full w-[60px] bg-orange-300 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
          </button>
    </div>


<div className="dropdown">
  <label tabIndex={0} >
  <div className='font-bold cursor-pointer'>
      <div className='text-xs sm:text-xs'>Hello {user?.name ? user.name : "SignUp"}</div>
      <div className=' text-sm sm:text-sm md:text-sm flex '>
         <span >Account & Lists</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mt-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
        </div>
    </div>
  </label>
  <div tabIndex={0} className="dropdown-content card card-compact w-64 p-2 shadow bg-white text-primary-content text-black">
    <div className="card-body text-black">
      <button className='w-[90%] p-1 text-center  bg-gradient-to-t from-yellow-400 to-yellow-300' onClick={() => user?.name ? signOut() : router.push("/signup")}>{user?.name ? "LogOut" : "SignUp"}</button>
    </div>
  </div>
</div>


    <div className='cursor-pointer'>
        <div className='mt-5 text-xs font-bold sm:text-sm'>Orders</div>
    </div>

    <Link href={'cart'} className='relative cursor-pointer w-[40px] h-[40px]'>
      <Image alt=''  width={500} height={500} style={{width : "100%" , heigth : "100%" , backgroundSize : "cover"}} src = {"/icons8-shopping-cart-50.png"}/>
      <div className={`absolute top-[-12px] left-[50%] ${cartItemsCount >= 1000 ? "text-xs" : "" } ${cartItemsCount >= 100 ? "translate-x-[-40%]" : "" } ${cartItemsCount >= 10 ? "translate-x-[-25%]" : "" } translate-x-[-10%] font-bold text-lg text-orange-400`}>{cartItemsCount}</div>
    </Link>

    </div>

    <div className=' w-full  my-1 md:hidden  flex items-center h-[40px]   justify-between border-2 border-gray rounded-md  text-black '>
    
    <select onChange={(e) => setSelectedCategory(e.target.value)} className=" text-[10px] sm:text-sm text-gray-800 bg-gray-100 h-full w-16 md:w-fit">
       {Categories.map((item , index) =>{
           return (
               <option key={index} value={item.title} className=' ml-2 cursor-pointer font-normal'>{typeof item == "string" ? item : item.title[0].toUpperCase() + item.title.slice(1 , item.title.length)}</option>
               )
           })}
       </select>

{/* sm screens */}
   <Select
         options={options}
         placeholder="Search Items"
         value={selectedCategory}
         isSearchable={true}
         onChange = {handleChange}
         className = {"basis-full "}
         onFocus = {() => setFocusEffect(true)}
   />   
           <button className=" flex justify-center  items-center h-full w-[60px] bg-orange-300 ">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
             </svg>
         </button>
   </div>

    </div>
    </>

  )
}

export default HeaderTop
