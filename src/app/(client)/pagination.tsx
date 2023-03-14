



'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { useSearchParams } from 'next/navigation';
import { handleURLRedirection } from '@/uttils/jsUtills';
import ReactPaginate from 'react-paginate';
import { itemType } from '@/types/types';


function Pagination({  itemsNumber} : {items : itemType  , itemsNumber : number}) {
    let router = useRouter()
    let searchParams = useSearchParams()
    const pathName = usePathname()

    const pageCount = Math.ceil(itemsNumber/ 10);
  
    function handlePageChange(page : number | undefined){
      router.push(handleURLRedirection(pathName as string,searchParams,{page : page} , undefined))
      console.log(page)
      window.scrollTo({top : 0 , behavior : "smooth"})
    }

  return (
    <div className=' w-10 gap-2 flex justify-center'>
      {itemsNumber > 10 && <div className="flex gap-2">
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next "
        onPageChange={({selected}) =>{ 
          handlePageChange(selected)
        }}
        initialPage= {+searchParams.get("page") || 0}
        pageRangeDisplayed={3}
        className = {"flex gap-1"}
        pageClassName = {"btn  bg-[white] hover:bg-gray-200 btn-xs sm:btn-sm px-2 sm:px-5"}
        pageCount={pageCount}
        pageLinkClassName = {"  text-black "}
        previousLabel=" previous"
        activeClassName = {` bg-gray-300`}
        nextClassName = {"btn btn-xs sm:btn-sm my-auto"}
        previousClassName = {"btn btn-xs sm:btn-sm my-auto"}
      />
       </div>}
    </div>
  )
}

export default Pagination









