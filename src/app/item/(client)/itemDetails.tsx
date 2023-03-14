

'use client';

import { addtoCart, checkItemStock, SERVERURL } from '@/uttils/jsUtills';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper';
import Image from 'next/image'
import { itemType } from '@/types/types';




function ItemDetails({
    item ,
}: {
    item : itemType ,
}) {
    let [imgIndex , setImgIndex] = useState(0) 
    let [quantity , setQuantity] = useState(1) 
    let [stockErr , setStockErr] = useState(false)
    const { mutate } = useSWRConfig()
    const {data : cart} = useSWR("api/cart")
    let router = useRouter()

  const isItemInCart = cart?.find((cartItem : itemType) => cartItem._id == item._id)

  async  function handleAddtoCart(){
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
            quantity : quantity
        }
        if(checkItemStock(item.stock , quantity)) {
            if(!isItemInCart){
              let res = await addtoCart(itemToAdd)
              if(res.status !== 401){
                router.push("/cart")
                mutate("api/cart" , [itemToAdd , ...cart])
              }else{
                await fetch(SERVERURL+"/api/createsession")
                addtoCart(itemToAdd)
                router.push("/cart")
                mutate("api/cart" , [itemToAdd , ...cart])
              }
            }
            return
        }
        setStockErr(true)
    }
    


  return (

    <div className='flex flex-col  justify-center sm:flex-row  py-10 sm:pr-10'>

    {/* first */}
    
      {/* md screens */}
       <div className='hidden sm:h-full pr-4 sm:flex sm:w-[40%]'>
            <div className='p-5 w-fit'>
                {item.images.map((img : string , index : number) =>{
                    return (
                        <div key={index} onMouseOver={() => setImgIndex(index)}  className={`mb-5 sm:w-[50px] sm:h-[50px] md:w-[90px] md:h-[60px] ${index == imgIndex ? "ring-offset-2 ring-4 ring-yellow-200" : ""}`}>
                           <Image width={500} height = {500} loading='lazy' blurDataURL = {img} alt='' src={img} className = {'object-contain w-full h-full'}/>
                        </div>
                    )
                })}
            </div>
               <div className='sm:w-[500px] sm:h-[400px]'>
                <Image loading='lazy' blurDataURL = {item.images[imgIndex]} width={500} height = {500} alt='' src={item.images[imgIndex]} className = {"bg-contain w-full h-full"} />
                </div>   
        </div>

      {/* sm screens */}
      <div className='block w-[90%] mx-auto order-2 sm:hidden'>
        <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {item.images.map((img : any , index : number) => 
        <SwiperSlide key={index}><Image width={500} height = {500} loading='lazy' blurDataURL = {img} alt='' className='object-contain w-full h-[400px]' src = {img}/>
        </SwiperSlide>
        )}
      </Swiper>
        </div>

      {/* second */}
    <div className='p-3 order-1  sm:order-2 sm:w-[45%]'>
            <div className='text-xl'>{item.description}</div>
            <div className='flex gap-1 items-center py-3'>
              <div className='font-semibold'>Brand :</div> 
              <span onClick={() => router.push(`/items?category=${item.category}&brand=${item.brand}`)} 
                 className='text-cyan-900  cursor-pointer'>
                {item.brand}
              </span>
             </div>

        <div className='flex gap-2 items-center'>
              <div className='rating rating-sm '>
                  {new Array(Math.round(item.rating)).fill(undefined).map((_ , index) =>{
                 return <input key={index} name={`rating-2`} className="mask mask-star-2 bg-orange-400" />
                }) }
             </div>
             <div className='text-sm text-cyan-900'>{item.globalRatings} ratings</div>
          </div>

          <div className='flex gap-2 items-center py-3'>
                <div className='h-[20px] w-[2px] bg-red-800'></div>
                <div>{item.comments.length} <span className='font-semibold'>Glopal Reviews</span></div>
          </div>
          <hr></hr>

          <div className='flex pt-2 items-center gap-3'>
           <div className='flex'>
            <div className='text-red-600 text-2xl font-light'>{item.discountPercentage}%</div>
            <div className='font-semibold italic'>Off</div>
            </div>

            <div className='font-semibold text-black-700 text-2xl'>{item.price}$</div>
          </div>
          
          <div className='flex gap-2 text-xs items-center text-cyan-900'>
          <div>list price : </div>
          <div className='line-through  '>
                {Math.round((1 + (item.discountPercentage / 100)) * item.price)}
          </div>
          </div>
        </div>


    {/* third */}
        <div className='order-3 mx-auto  my-10 w-[90%] sm:my-0 items-center   sm:border-[1px] border-gray-200 sm:w-[20%] rounded-xl overflow-hidden pb-2 '>
           
            <div className='w-full h-[10px] bg-gradient-to-r from-yellow-300 to-yellow-200 '></div>
           
           <div className='p-2 h-full flex flex-col sm:items-start'>

            <div className='w-fit sm:basis-full '>
              {<div className='text-2xl sm:text-3xl font-semibold pb-2 text-grey-900'> {item.price}$ </div> } 
                {item.discountPercentage > 0 &&<div className=' text-red-600 flex  items-center gap-2 w-fit h-fit'>
                <div className='text-sm '>Save</div>
                <div className='text-md sm:text-xl '>{item.discountPercentage}% </div>
              </div> } 


              <div className='text-sm  text-yellow-600  sm:text-md font-semibold py-1'>Usually ships within 4 to 5 days.</div>   
              {(item.stock > 10) && <div className=' text-md sm:text-lg py-5 font-semibold text-green-800'>In Stock</div>}
              {item.stock < 0 && <div className=' text-md sm:text-lg py-5 font-semibold text-red-800'>Out of Stock</div>}
              {item.stock < 10 && <div className='text-md sm:text-lg py-5 font-semibold text-red-800'>Only {item.stock} in Stock</div>}
              </div>


            <div className=' sm:w-full flex flex-col items-center'>
                  <div className='w-fit sm:w-full sm:flex-start pb-2'>
                      {!isItemInCart && <input placeholder='QTY' min={1} className='input input-bordered input-warning w-full input-xs' onChange={(e) => {
                          setQuantity(+e.target.value)
                          setStockErr(false)
                          }} type={"number"} style = {{width : 50}} />}
                  </div> 
                    {!isItemInCart && <button onClick={handleAddtoCart} className='block rounded-full text-sm sm:text-md bg-yellow-400 w-[300px] sm:w-full p-1'>Add to Cart</button>}
                    {isItemInCart && <button className='rounded-full bg-gray-100 text-gray-500  btn-disabled w-[300px] sm:w-full p-1'>Item is already in Cart</button>}
                    {stockErr && <div className='text-red-600 font-semibold text-xs'>you have selected more than {item.stock} in stock of this product </div>}
                    <button className='block rounded-full text-sm sm:text-md bg-orange-400 w-[300px] my-2 sm:w-full p-1'>Buy Now</button>
                </div>

                <div className='flex flex-col w-full justify-between'>
                    <div className='text-xs text-gray-500 px-1 flex justify-between'>
                        <div>Delivered by</div>
                        <div>Amazon.eg</div>
                    </div>                   
                     <div className='text-xs text-gray-500 flex justify-between px-1'>
                        <div>sorted by</div>
                        <div>{item.brand}</div>
                    </div>
                </div>
              </div>

        </div>

    </div>
  )
}

export default ItemDetails







