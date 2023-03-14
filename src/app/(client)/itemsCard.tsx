
import { getItems } from '@/api/serverApi'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { itemType } from '@/types/types'

async function ItemsCard({
    categoryName ,
    cartItems
} : {
  categoryName? : string ,
  cartItems? : any[]
}) {


 let categoryItems = await getItems({
    category : categoryName
  })


  return (
   <div className='flex flex-col  bg-white p-4 w-full h-full border-2 border-black-400 md:col-span-2'>

      {(!cartItems || cartItems?.length == 0) && <div className='text-lg pb-3 font-semibold'>{categoryName}</div>}
      {(cartItems && cartItems?.length > 0) && <div className='text-sm pb-3 text-cyan-800'><a href='/cart'>proceed to Buy</a></div>}
  
    {(!cartItems || cartItems?.length == 0) && <div className='grid  w-full gap-8  grid-cols-2 grid-rows-2  items-center'>
      { categoryItems.items.slice(0,4).map((item : itemType) =>{
        return (
          <div key={item._id} className='h-[150px]'>
               <Link aria-label={`go to ${item.title} page`} prefetch = {false} href={`/item/${item._id}`}>
                <Image loading='lazy' blurDataURL = {item.images[0]} width={500} height = {500} alt=''  src= {`${item.images[0]}`} className = {"object-contain h-[90%]"} />
                </Link>
              </div>
        )
      })}
      </div>}

 {(cartItems && cartItems.length > 0) && <div className='grid w-full gap-8  grid-cols-2 grid-rows-2  items-center'>
      {cartItems.slice(0,4).map((item : itemType) =>{
        return (
          <div key={item._id} className='h-[150px]'>
               <Link aria-label={`go to ${item.title} page`} prefetch = {false} href={`/item/${item._id}`}>
                <Image loading='lazy' blurDataURL = {item.images[0]} width={500} height= {500} alt=''  src= {`${item.images[0]}`} className = {"object-contain h-[90%] "} />
                </Link>
              </div>
        )
      })}
</div>}

    {(!cartItems || cartItems?.length == 0) && <div>
          <Link aria-label={`go to ${categoryName} page`} href={`items?category=${categoryName}`} className='text-cyan-600'>see more</Link>
    </div> }

    </div> 

  )
}

export default ItemsCard










