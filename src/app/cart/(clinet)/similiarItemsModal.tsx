
'use client'


import { getItems } from '@/api/serverApi'
import {  addtoCart, SERVERURL } from '@/uttils/jsUtills'
import React from 'react'
import { Button, Modal } from 'react-daisyui'
import useSWR, { useSWRConfig } from 'swr'
import Image from 'next/image'
import { itemType } from '@/types/types'




function SimiliarItemsModal({
    toggleVisible , 
    visible ,
    item
}:{
    toggleVisible : any , 
    visible : boolean ,
    item : itemType
}) {


    let {data : cartItems} = useSWR("api/cart")
    let {data:similiarItems , isLoading} = useSWR(["similiarItem" , item._id] , () => getItems({category : item.category}))


    let cartItemsIds = cartItems?.map((item : any) => item._id)
    similiarItems = similiarItems?.items.filter(((similiarItem : any) => similiarItem._id !== item._id))
    
    const { mutate } = useSWRConfig()


    async  function handleAddtoCart(item : any){
        let itemToAdd = {
            brand : item.brand ,
            category : item.category ,
            description : item.description ,
            discountPercentage : item.discountPercentage,
            price : item.price ,
            stock : item.stock,
            title : item.title ,
            globalRatings : item.globalRatings ,
            views : item.views ,
            rating : item.rating,
            orders : item.orders ,
            images : item.images ,
            _id : item._id, 
            quantity : 1
        }
              let res = await addtoCart(itemToAdd)
              if(res.status !== 401){
                mutate("api/cart" , [itemToAdd , ...cartItems])
              }else{
                await fetch(SERVERURL+"/api/createsession")
                addtoCart(itemToAdd)
                mutate("api/cart" , [itemToAdd,...cartItems])
              }
    }

  return (
    <Modal  className='p-0 max-w-4xl' open={visible}>

           <Modal.Actions className='p-2 m-0'>
               <Button className='btn-sm' onClick={toggleVisible}>X</Button>
          </Modal.Actions>

        {isLoading&& <Modal.Body>
            <progress className="progress w-56"></progress>
        </Modal.Body>}

      {!isLoading && <Modal.Body className='w-full p-4'>
            <div className='flex w-full '>

                <div className='w-[20%] pr-3'>
                    <div className='h-[300px]'></div>
                    <div className=' p-1 bg-[#f6f6f6]  p-2 text-[8px] sm:text-[12px] border-1 rounded-sm mb-1 '>Customer Rating</div>
                    <div className='p-1 bg-[#f6f6f6] p-2 text-[9px] sm:text-sm border-1 rounded-sm mb-1'>Price</div>
                    <div className='p-1 bg-[#f6f6f6] p-2 text-[9px] sm:text-sm border-1 rounded-sm mb-1'>Views</div>
                    <div className='p-1 bg-[#f6f6f6] p-2 text-[9px] sm:text-sm border-1 rounded-sm'>Sold By</div>
                </div>



                <div className='flex w-[70%]'>
                    <div className='w-[90px] sm:w-[200px] mr-2 h-full'>
                        <div className='h-[300px]'>
                                <div>
                                    <Image  width={500} height = {500} loading='lazy' blurDataURL = {item.images[0]} alt='' src={item.images[0]} className = 'object-contain h-[150px] w-full' />
                                </div>
                                <div className='text-[9px] sm:text-sm py-3 text-cyan-500'>{item.description}</div>
                        </div>

                     <div className='bg-[#ffffde] mb-1 w-full flex items-center gap-1 p-2'>
                        <div className='rating rating-sm '>
                            {new Array(Math.round(item.rating)).fill(undefined).map((_,index) =>{
                                return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
                                }) }
                            </div>
                        <span className='text-sm text-[#007185]'>({item.globalRatings})</span>
                     </div>

                        {item.discountPercentage > 0 &&<div className='mb-1 text-xs sm:text-sm p-2 text-[#B12704]'> {Math.ceil(item.price * (item.discountPercentage / 100))}$ </div> } 
                        {item.discountPercentage < 1 &&<div className='mb-1 text-xs sm:text-sm p-2 text-[#B12704]'> {item.price}$ </div> } 
                        <div className='text-xs sm:text-sm p-2 bg-[#ffffde] mb-1'>{item.views}</div>

                        <div className='mb-1 p-2 text-[10px] sm:text-sm font-semibold'>{item.brand}</div>
                        <div className='p-2 font-bold text-[10px] sm:text-sm'>in your Cart</div>

                    </div>



                    <div className='h-full flex w-[70%] gap-5 overflow-x-scroll	'>
                        {similiarItems?.slice(0,4).map((item : any) =>{
                          return <div key={item._id} className='min-w-[90px] sm:min-w-[200px]'>
                                        
                            <div className='h-[300px]'>
                                     <div>
                                            <Image  width={500} height = {500} loading='lazy' blurDataURL = {item.images[0]} alt='' src={item.images[0]} className = 'object-contain h-[150px] w-full' />
                                    </div>
                                    <div className='text-[9px] sm:text-sm py-3 text-cyan-500'>{item.description}</div>
                                </div>

                            <div className='bg-[#eee] mb-1 w-full flex items-center gap-1 p-2'>
                                <div className='rating rating-sm '>
                                    {new Array(Math.round(item.rating)).fill(undefined).map((_,index) =>{
                                        return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
                                        }) }
                                    </div>
                                <span className='text-xs sm:text-sm text-[#007185]'>({item.globalRatings})</span>
                            </div>

                            {item.discountPercentage > 0 &&<div className='mb-1 text-xs sm:text-sm p-2 text-[#B12704]'> {Math.ceil(item.price * (item.discountPercentage / 100))}$ </div> } 
                            {item.discountPercentage < 1 &&<div className='mb-1 text-xs sm:text-sm p-2 text-[#B12704]'> {item.price}$ </div> } 
                            <div className='text-sm p-2 bg-[#eee] mb-1'>{item.views}</div>

                            <div className='mb-1 p-2 text-[10px] sm:text-sm font-semibold'>{item.brand}</div>
                            {cartItemsIds.includes(item._id) && <div className='p-2 font-bold text-[10px] sm:text-sm'>in your Cart</div>}
                            {!cartItemsIds.includes(item._id) &&  <button onClick={() => handleAddtoCart(item)} className='btn btn-xs text-[10px]  btn-warning '>Add To Cart</button>}

                              </div>
                                })}
                    </div>

                </div>

            </div>
      </Modal.Body>}


    </Modal>
  )
}

export default SimiliarItemsModal





