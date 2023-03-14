




'use client'



import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import useSWR  from 'swr'
import { checkItemStock, deleteFromCart, ItemCartQuantityChange, SERVERURL} from "../../../uttils/jsUtills"
import SimiliarItemsModal from './similiarItemsModal'
import Image from 'next/image'
import { itemType } from '@/types/types'

function CartItem({
  item ,
  setTargetItem
} : {
  item : itemType  ,
  setTargetItem : any
}) {
  let [newQuantity , setNewQuantity] = useState(item.quantity)
  let [numberFieldAccess , setNumberFieldAccess] = useState(false)
  let router = useRouter()
  let {data : cartItems , mutate} = useSWR("api/cart")
  let [itemPrice] = useState(item.price)
  const [visible, setVisible] = useState<boolean>(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  async function handleUpdateCart(quantity : number){

    if(quantity){
      if(quantity == 10) return setNumberFieldAccess(true)
    }

    if(checkItemStock(item.stock,quantity)){
      setNewQuantity(quantity)
      mutate(cartItems.map((cartItem : any) => {
        if(cartItem._id == item._id){
          return {...cartItem , quantity : quantity}
        }
        return cartItem
      }))
      ItemCartQuantityChange(item._id , quantity)
      setTargetItem(null)
      return
     }


     mutate(cartItems.map((cartItem : any) => {
      if(cartItem._id == item._id){
        return {...cartItem , quantity : item.stock}
      }
      return cartItem
    }))
      ItemCartQuantityChange(item._id , item.stock)
      setNewQuantity( item.stock)
      setTargetItem(item)
      window.scrollTo({top : 0 , behavior : "smooth"})
  }



  return (
    <>
    <SimiliarItemsModal toggleVisible={toggleVisible} visible={visible} item={item} />
    <div className='flex py-2 sm:p-5 w-full'>
      
        <div className='h-full mr-2'>
            <Image width={500} height = {500} loading='lazy' blurDataURL = {item.images[0]} alt='' onClick={() => router.push(`/item/${item._id}`)} src={item.images[0]} className = 'cursor-pointer object-cover sm:bg-cover sm:object-contain w-[200px] h-full'/>
        </div>

    <div className='w-full flex flex-col'>

      <div className='flex flex-col md:justify-between md:flex-row gap-4 sm:gap-7  '>
          <div className='text-[11px] pb-2 sm:pb-5 sm:text-xs md:text-sm'>{item.description}</div>
          {<div className='  text-md sm:text-2xl text-gray-700 font-semibold '> {itemPrice}$ </div> } 
      </div>

      <div className='basis-full'>
          {item.stock > 20 && <div className='text-green-600 font-semibold py-5'>In Stock</div>}
          {item.stock <= 20 &&<div className='text-[10px] sm:text-sm text-red-600 py-5'>Only {item.stock} Left in Stock - order soon</div>}
      </div>

  <div className='flex flex-col  md:justify-between md:items-center md:flex-row'>

        <div className='flex items-center  mb-3 mb:mb-0'>        
        {!numberFieldAccess &&<select placeholder='QTY' value={newQuantity} onChange={(e) =>handleUpdateCart(+e.target.value)
          } className="select select-accent select-sm w-[65px]">
            <option disabled  selected>{newQuantity}</option>
            {new Array(10).fill(null).map((_ , index : number) =>{
                 return <option key={index}>{index == 9 ? `+${index+1}` : index + 1}</option>
            })}
        </select>}

        <div className='flex items-center gap-4'>
        {numberFieldAccess && <input value={newQuantity} onChange={(e) => setNewQuantity(+e.target.value)} type="number" placeholder="Type here" min = {1} className="input input-bordered input-accent input-sm w-[65px]" />}
        {numberFieldAccess &&<button  onClick={(e) => handleUpdateCart(newQuantity)} className='btn btn-xs btn-outline'>Submit</button>}
        </div>
      </div>

       <div className='flex w-full justify-between md:w-fit items-center'>
          <div  onClick={async() => {
            let res = await deleteFromCart(item._id).then(res => res)
            if(res.status !== 401){
              mutate(cartItems.filter((cartItem : any) => cartItem._id !== item._id))
            }else{
               fetch(SERVERURL+"/api/createsession")
               deleteFromCart(item._id)
               mutate(cartItems.filter((cartItem : any) => cartItem._id !== item._id))
            }
            }} className='text-[10px] sm:text-xs md:text-sm  text-cyan-600 cursor-pointer'>delete</div>
          <div className="divider m-0 p-0 divider-horizontal"></div>
          <div onClick={() => setVisible(true)} className='text-[9px] whitespace-pre-wrap	sm:text-xs md:text-sm text-cyan-600 cursor-pointer'>compare with similiar items</div>
       </div>

      </div>

      </div>

    </div>
    <hr></hr>
    </>

  )
}

export default CartItem
