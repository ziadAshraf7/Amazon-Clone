
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import Image from 'next/image'

type props = {
    title : string , 
    img : string
}

function CategoryCard({
    title , 
    img
} : props) {

  let router = useRouter()

  return (
    <div className='flex flex-col bg-white p-5  w-full h-fit  border-2 border-black-400 '>
            <div className='text-xl pb-2 font-semibold md:text-lg lg:text-md'>{title[0].toUpperCase() + title.slice(1 , title.length)}</div>
           
              <Link aria-label = {`go to ${title} page`} href={`items?category=${title}`}  className = {"h-full w-full pb-3"}>
                  <Image  loading='lazy' blurDataURL = {img} placeholder='blur' width={500} height = {500} style={{height : 300, width : "100%"}}  onClick={() => router.push(`/items?category=${title}`)} src={`/${img}`} alt={''} />
              </Link>

            <Link aria-label = {`go to ${title} page`} href={`items?category=${title}`} className = {'text-cyan-600 w-fit '}>shop now</Link>
    </div>

  )
}

export default CategoryCard
