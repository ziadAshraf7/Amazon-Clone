
import { getItems } from '@/api/serverApi';
import getUserSession from '@/uttils/session';
import React from 'react'
import CartDetails from './(clinet)/cartDetails';



async function Page() {

  let session = await getUserSession()

  let categoriesRelatedToCart : Set<string[]> | null = session?.cart?.length > 0 ?
  new Set<string[]>(session.cart?.map((item : any) => item.category)) : null

  let similiarItems = categoriesRelatedToCart ? (await getItems({category : Array.from(categoriesRelatedToCart || 0) as unknown as string[]})).items : []

  return (
       <CartDetails 
         similiarItems = {similiarItems} 
         categoriesRelatedToCart = {categoriesRelatedToCart ? Array.from(categoriesRelatedToCart) : []} />
  )
}

export default Page
