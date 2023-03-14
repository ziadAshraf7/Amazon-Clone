

import { getItems } from '@/api/serverApi';
import Link from 'next/link';
import CarouselProvider from '../carouselProvider';
import Image from 'next/image'
import { itemType } from '@/types/types';

async function CategoryCarouselItems({
    mostViews , 
    bestSeller,
    categoryName ,
} : {
    mostViews? : boolean ,
    bestSeller? : boolean ,
    categoryName : string  ,
}){


  
    const data =  (await getItems({
      category : categoryName ,
      mostViews : mostViews ? mostViews : undefined ,
      bestSeller : bestSeller ? bestSeller : undefined ,
    })).items.map((item : itemType) =>{
      return (
                 <Link aria-label={`go to ${item.title} page`} key={item._id} className=' w-full h-[130px] sm:h-[200px] ' href={`/item/${item._id}`}>
                    <Image loading='lazy' blurDataURL = {item.images[0]} placeholder='blur' width={500} height = {500} alt='' className='object-contain w-full h-full' src = {item.images[0]} />
                </Link> 
      )
  }) 

  

  if(data.length == 0){
    return <></>
  }

  return (
    <div className= {`col-span-full w-full`}>

      <CarouselProvider 
        items={data}
        bg = {"white"}
        >
        <div className='flex  justify-between bg-white'>
             {mostViews &&<div className='text-md sm:text-xl font-semibold mb-1'>Most views of {categoryName}</div>}
             {bestSeller &&<div className='text-md sm:text-xl font-semibold mb-1'>Best seller of {categoryName}</div>}
             <Link aria-label={`go to ${categoryName} page`} href={`/items?category=${categoryName}`} className='text-sm sm:text-mg text-cyan-600'>see more</Link>
        </div>
        </CarouselProvider>

    </div>
  )
}

export default CategoryCarouselItems












