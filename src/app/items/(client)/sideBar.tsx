
'use client'


import { handleURLRedirection } from '@/uttils/jsUtills'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

function SideBar({brands} : {brands : string[]}) {
    const searchParams = useSearchParams();
    const pathName = usePathname()
      let router = useRouter()

    let [min , setMin] = useState("0")
    let [max , setMax] = useState("0")




  return (
    <div  className='w-[18%] p-3  sticky top-0  bg-white hidden sm:hidden md:block border'>
        <div className='mb-2'>
            <div className='text-md font-semibold '>Fulfilled by Amazon</div>
                <div  className='flex items-center '>
                    <input checked = {searchParams.has("bestseller")} onChange={(e) => {
                        if(e.target.checked) router.push(handleURLRedirection(pathName as string , searchParams , {key :"bestseller" , value : undefined , page : +searchParams.get("page") || 0}   , undefined))
                        if(!e.target.checked) router.push(handleURLRedirection(pathName as string , searchParams , undefined  , "bestseller"))
                        }} className='mr-2' id = {"bestSeller"} type = {"checkbox"} />
                    <label className='text-sm cursor-pointer hover:text-orange-500' htmlFor = {"bestSeller"}>Fulfilled by Amazon</label>
                </div>
            </div>

            <div className='mb-2'>
                <div className='text-md font-semibold'>
                    <div>Avg. Customer Review</div>
                        {new Array(4).fill(null).map((_ , index) =>{
                            return (
                                <div key={index} onClick={() =>{
                                    router.push(handleURLRedirection(pathName as string , searchParams , {key : "rating" , value  : index + 1 as unknown as string , page : 0} ,undefined))
                                    }} className={`flex cursor-pointer w-fit  hover:text-orange-600`}>
                                      <div className="rating rating-sm block">
                                        {new Array(index + 1).fill(null).map((_,index) =>{
                                            return  <input key={index} readOnly checked = {index == 0} type="radio" name={`rating-${index}`} className="mask mask-star-2 bg-orange-400" />
                                        })}
                                    </div>
                                    <span className={`text-sm ${String(index + 1)  == (searchParams.has("rating") ? searchParams.get("rating") : false) ? "text-orange-600" : ""}`}>& Up</span>
                                </div>

                            )
                        })}
                    </div>
            </div>


          {(searchParams.has("category") && searchParams.get("category")?.split(",").length == 1) && <div className='mb-2'>
                <div className='text-md font-semibold'>Brands</div>
                <div>
                    <div onClick={() => {
                     router.push(handleURLRedirection(pathName as string , searchParams , {key : "brand" , value : "All" , page : 0} , undefined))
                    }} className={`text-sm font-normal cursor-pointer ${(searchParams.get("brand") == "All" || !searchParams.has("brand")) ? "font-semibold" : ""}`}>All Brands</div>
                    {brands?.map((brand : string) =>{
                        return (
                        <div key={brand} onClick={() => {
                            router.push(handleURLRedirection(pathName as string , searchParams , {key : "brand" , value : brand , page : 0} , undefined))
                        }} className={`text-sm font-normal cursor-pointer ${searchParams.get("brand") == brand ? "font-semibold" : ""}`}>
                           {brand}
                        </div>
                        )
                    })}
                </div>
            </div>}

            <div className='mb-2'>
                <div className='text-md font-semibold'>Offers</div>
                <div className='text-sm'>
                <input  checked = {searchParams.has("offer")} onChange={(e) => {
                                            if(e.target.checked) router.push(handleURLRedirection(pathName as string , searchParams , {key : "offer" , value : undefined , page : 0}  , undefined))
                                            if(!e.target.checked) router.push(handleURLRedirection(pathName as string , searchParams , undefined  , "offer"))
                }} className='mr-2' id = {"offer"} type = {"checkbox"} />
                <label htmlFor='offer'>Offers</label>
                </div>
            </div>

            <div>
                <div className='text-md font-semibold'>Availability</div>
                <div className='text-sm'>
                <input checked = {searchParams.has("outOfStock")} onChange={(e) =>{
                                            if(e.target.checked) router.push(handleURLRedirection(pathName as string , searchParams , {key : "outOfStock" , value : undefined , page : 0}  , undefined))
                                            if(!e.target.checked) router.push(handleURLRedirection(pathName as string , searchParams , undefined  , "outOfStock"))
                }} className='mr-2' id = {"outOfStock"} type = {"checkbox"} />
                <label htmlFor='outOfStock'>Include Out of Stock</label>
                </div>
            </div>


            <div className='py-4'>
                <div className=' font-semibold'>Price</div>
                <div className='flex gap-2'>
                    <div>
                      <label className='text-sm'>min</label>
                      <input value={min} onChange={(e) => setMin(e.target.value)} type="number" min = {0} placeholder="Type here" className="input input-bordered input-xs w-full max-w-xs" />
                    </div>
                    <div>
                      <label className='text-sm'>max</label>
                      <input type="number" value={max} min = {min} onChange={(e) => setMax(e.target.value)} placeholder="Type here" className="input input-bordered input-xs w-full max-w-xs" />
                    </div>
                </div>
                <div className='w-full flex justify-between mt-3'>
                  <button onClick={() => {
                    router.push(handleURLRedirection(pathName as string , searchParams , {key:"priceRange", value:`${min},${max}`}  , undefined))
                  }} className=' btn btn-xs btn-warning'>submit</button>
                  <button onClick={() => {
                                        router.push(handleURLRedirection(pathName as string , searchParams , {key:"priceRange", value:`All`}  , undefined))
                  }} className=' btn btn-xs btn-error'>Reset</button>
                </div>
            
              <div className='mt-3'>
                   {(searchParams?.get("priceRange")?.split(",").length > 1) && <div className='text-xs font-semibold'>Min : {searchParams.get("priceRange")?.split(",")[0]}</div>}
                  {searchParams.get("priceRange")?.split(",").length > 1 && <div className='text-xs font-semibold'>Max : {searchParams.get("priceRange")?.split(",")[1]}</div>}
                </div>

            </div>

    </div>
  )
}

export default SideBar
