
import { getItems } from '@/api/serverApi'
import React from 'react'
import Item from './(client)/ItemComponent'
import Pagination from '../(client)/pagination';
import FilterHeader from './(client)/filterHeader';
import SideBar from './(client)/sideBar';
import { cookies } from 'next/headers';
import { itemType } from '@/types/types';
import CategoryCarouselItems from '../(server)/categoryCarouselItems';
import PriceFilterationBottomBar from './(client)/priceFilterationBottomBar';



async function Page({
    searchParams,
  }: {
    searchParams?: {
      all : boolean ,
      outOfStock : any , 
      sort : string , 
      category? : string  , 
      bestseller?:any , 
      rating : number , 
      offer : string , 
      brand? : string , 
      page? : string,
      priceRange? : string
    };
  }) {
    const nextCookies =  cookies()
    

    let data = (await getItems({
        all : searchParams?.all ? true : false ,
        category : searchParams?.category !== undefined ?  searchParams.category  : undefined, 
        bestSeller:searchParams?.bestseller == "" ? true : false,
        rating : searchParams?.rating, 
        offer : searchParams?.offer ,
        brand : searchParams?.brand ,
        sort : searchParams?.sort , 
        outOfStock : searchParams?.outOfStock == "" ? true : false ,
        page : searchParams?.page ? searchParams.page : "0" ,
        priceRange : searchParams?.priceRange ,
        userToken : nextCookies.get("sid") || nextCookies.get(process.env.ACCESSTOKENKEY as string)
    }))


    let brands = searchParams?.category?.split(",").length == 1 ? new Set((await getItems({
      category : searchParams?.category !== undefined ?  searchParams.category  : undefined
    }))?.items?.map((item : itemType) => item.brand)) : []


    if(data?.items?.length == 0 || data?.message){
      return <div className='w-fit mx-auto text-xl p-4 '>No Items Found</div>
    }

  return (

   <div className='w-full h-full'>
    <FilterHeader brands={brands} />
    <div className='h-[39px]'></div>

    <div className='flex  h-full  w-full'>
    <SideBar brands = {Array.from(brands) as string[]} />
    <div className='flex w-full sm:w-[82%] flex-col items-center'>
    <div className='grid pt-5 mb-5 px-2 sm:mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {data.items.map((item : itemType ) =>{
          return (
            <Item 
                key={item.id}
                brand={item.brand}
                category={item.category}
                description={item.description}
                discountPercentage={item.discountPercentage}
                price={item.price}
                stock={item.stock}
                title={item.title}
                globalRatings={item.globalRatings}
                views={item.views}
                rating={item.rating}
                orders={item.orders}
                images={item.images}
                id={item._id}
                sponsored={item.sponsored} 
                _id={item._id} 
                allRatings={[]} 
                comments={[]}
                />
            )
          })}
       
    </div>
         <Pagination items={data.items} itemsNumber = {data.itemsNumber}  />
    </div>

    </div>
          <div className='py-5 w-full mx-auto'>{(searchParams?.category && searchParams.category.split(",").length == 1) && <CategoryCarouselItems bestSeller = {true}  categoryName={searchParams.category}  />}</div>
          <div className='w-full mx-auto'>{(searchParams?.category && searchParams.category.split(",").length == 1) && <CategoryCarouselItems mostViews = {true}  categoryName={searchParams.category}  />}</div>
    
          <PriceFilterationBottomBar />

    </div> 
  )
}

export default Page
