
'use client'

import { calcCartSubTotalCash, getCartItemsCount } from '@/uttils/jsUtills'
import Link from 'next/link'
import React, { useState } from 'react'
import CartAlert from './cartAlert'
import CartComponent from "./cartItem"
import useSWR  from 'swr'
import Image from 'next/image'
import { itemType } from '@/types/types'

function CartDetails({
    similiarItems ,
    categoriesRelatedToCart
} : {
    similiarItems : itemType[] ,
    categoriesRelatedToCart : any[] 
}) {
    let {data : cartItems} = useSWR("api/cart")
    let [targetItem , setTargetItem] = useState()

    let cartSubTotal = calcCartSubTotalCash(cartItems || [])
    let cartItemsCount = getCartItemsCount(cartItems || [])

    if(!cartItems || cartItems.length == 0){
      return <div className='w-fit mx-auto  p-5 text-xl'>No Items Found In Cart</div>
    }
  
  return (
    <div className='w-full bg-gray-100 p-5'>

        <CartAlert  item = {targetItem} />

    {/* first section */}
    <div className='flex gap-4 w-full flex-col sm:flex-row sm:justify-between'>
    <div className='bg-white p-4 w-full'>
      <div className='text-lg sm:text-3xl font-semibold pb-4'>Shopping Cart</div>
      <hr className='border-1 border-gray-800'></hr>
      <div className='flex flex-row-reverse pr-5 font-semibold hidden sm:flex'><span>price</span></div>
            {cartItems && cartItems.map((item : itemType) =>{
                return ( 
                  <CartComponent key={item._id} setTargetItem = {setTargetItem} item = {item} />
                  )
              })}
              <div className='text-sm sm:text-lg  py-5 flex justify-end '>
                Subtotal ({cartItemsCount} items) : <span className='ml-1 font-semibold'>{cartSubTotal} </span> 
              </div>
     </div>   

    {/* second section */}
    <div className = 'sm:flex sm:flex-col sm:items-center w-full sm:w-[400px] '>
        <div className='text-center w-full'>
           <div className='text-lg bg-white w-full p-5 mb-5'>
            <div className='font-semibold'>
                <span>Subtotal</span>
                <span >({cartItemsCount} items) : <span className='font-bold text-lg'>{cartSubTotal}$</span></span>
                </div>
            <div className='py-2'>
            <button className='rounded-md bg-yellow-300 p-2 text-sm w-[90%]'>proceed to chechout</button>

            </div>

            </div>
        </div>

        
      {similiarItems.length > 0 && <div className='bg-white p-5'>
        <div className='font-semibold'>Products related to items in your cart</div>
        <div className='text-xs font-semibold text-gray-400'>Sponsored</div>
        {similiarItems.slice(0,5).map(item =>{
            return (
                <div key={item._id} className='flex my-2'>
                    <Link href={`item/${item._id}`} className='mr-2'><Image width={500} height = {500}  alt='' src={item.images[0]} style = {{width : 100 , height : 100}} /></Link>
                    <div >
                        <div className='text-sm text-cyan-600'>{item.title}</div>
                        <div className='rating rating-sm'>
                           {new Array(Math.round(item.rating)).fill(undefined).map((_ , index) =>{
                             return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
                              }) }
                      </div>
                          {item.discountPercentage > 0 &&<div className='text-sm text-red-700 font-semibold'> {Math.ceil(item.price * (item.discountPercentage / 100))}$ </div> } 
                          {item.discountPercentage < 1 &&<div className='text-sm text-red-700 font-semibold'> {item.price}$ </div> }                     
                    </div>
                </div>
            )
        })}
        <Link prefetch href={`items?category=${categoriesRelatedToCart?.join(",")}`} className='text-cyan-600 text-sm cursor-pointer'>see more</Link>
      </div>}
      </div>
    </div>
     

    </div>
  )
}

export default CartDetails





