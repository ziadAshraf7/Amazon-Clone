



'use client';




import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { handleURLRedirection } from '@/uttils/jsUtills'

function PriceFilterationBottomBar() {
    const searchParams = useSearchParams();
    let router = useRouter()
    let pathName = usePathname()
    let [min , setMin] = useState("0")
    let [max , setMax] = useState("0")
    let [collapse , setCollapse] = useState(false)


  return (
    <div className={` sm:hidden border-gray-200 ease-in duration-300 !important fixed bg-white  w-full p-3 h-[140px] z-10  ${collapse ? "bottom-[-100px]" : "bottom-0"}`}>
      
        <div onClick={() => setCollapse(!collapse)} className={` absolute ${collapse ? "rotate-180" : "rotate-0"} ease-in-out duration-500 right-0 top-[-10px]`}>
          {<svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                        </svg>
                }
        </div>
    <div>
</div>


      <div className='absolute top-0 w-full h-[1px] bg-gradient-to-r from-green-400 to-blue-500'></div>

      <div className='font-semibold mb-3 italic text-sm'>Price Range({
        (searchParams.has("priceRange") && searchParams.get("priceRange") !== "All") ? `${searchParams.get("priceRange")}`
        : "ALL prices"
      })</div>

          
              {!collapse && <div className='mb-2 flex gap-1'>
                    <label className='text-sm mr-2 italic'>min</label>
                    <input value={min} onChange={(e) => setMin(e.target.value)} type="number" min = {0} placeholder="Type here" className="input input-warning input-xs w-[100px] " />
                  </div>}
                  {!collapse && <div className='flex gap-1'>
                    <label className='text-sm mr-2 italic'>max</label>
                    <input type="number" value={max} min = {min} onChange={(e) => setMax(e.target.value)} placeholder="Type here" className="input  input-warning input-xs w-[100px] " />
              </div>}
        
     {!collapse && <div className='w-full flex justify-between mt-3'>
                <button onClick={() => {
                  router.push(handleURLRedirection(pathName as string  , searchParams , {key:"priceRange", value:`${min},${max}`}  , undefined))
                }} className=' btn btn-xs btn-warning'>submit</button>
                <button onClick={() => {
                                      router.push(handleURLRedirection(pathName as string  , searchParams , {key:"priceRange", value:`All`}  , undefined))
                }} className=' btn btn-xs btn-error'>Reset</button> 
              </div>}
  </div>
  )
}

export default PriceFilterationBottomBar





