
import { getCategories } from '@/api/serverApi'
import { generateRandomNumbers } from '@/uttils/jsUtills'
import { CategoriesType } from '@/types/types'
import CategoryCard from './(client)/categoryCard'
import ItemsCard from './(client)/itemsCard'
import CategoryCarouselItems from './(server)/categoryCarouselItems'
import HomeCarousel from './(client)/homeCarousel'
import Image from 'next/image'
import getUserSession from '@/uttils/session'
import Link from 'next/link'



export default async function Home() {

  let categories = await getCategories()
  let randomCategoryItemsIndexesArray = generateRandomNumbers(categories)

  let session = (await getUserSession())
  let cartItems = session?.cart ? session.cart : []

  return (
    <div className='w-full h-full pb-5 bg-gray-100'>
      <HomeCarousel />
    <div className='grid mt[0] sm:mt-[-250px] relative  mx-auto gap-3 grid-flow-dense place-items-center w-[95%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  '>

        {categories.slice(0,3).map((item : CategoriesType , index : number) => {
            return <CategoryCard 
            key = {index}
            title = {item.title}
            img = {item.img}
            />
        })}


        <ItemsCard 
          cartItems = {cartItems}
          categoryName = {categories[randomCategoryItemsIndexesArray[0]].title}
        />


          {categories.slice(3,8).map((item : CategoriesType , index : number) => {
            return <CategoryCard 
            key = {index}
            title = {item.title}
            img = {item.img}
            />
        })}


    <ItemsCard categoryName = {categories[randomCategoryItemsIndexesArray[1]].title} />

        
    <div className='col-span-1 sm:col-span-2'>
          <Image alt = '' className='w-full h-full object-contain' width = {550} height = {500} src = {"/Ecommerce - Ecommerce Online Shopping Page Banner, HD Png Download , Transparent Png Image - PNGitem.png"} />
        </div>


    <CategoryCarouselItems bestSeller = {true}  categoryName={categories[randomCategoryItemsIndexesArray[3]].title}  />

     {categories.slice(8,12).map((item : CategoriesType , index : number) => {
            return <CategoryCard 
            key = {index}
            title = {item.title}
            img = {item.img}
            />
        })}

   <CategoryCarouselItems bestSeller = {true} categoryName={categories[randomCategoryItemsIndexesArray[4]].title}  />


   <ItemsCard categoryName = {categories[randomCategoryItemsIndexesArray[2]].title} />

   <div className='col-span-1 sm:col-span-2'>
          <Image alt = '' className='w-full h-full object-contain' width = {550} height = {500} src = {"/E Commerce Online Vector Hd Images, Online Shopping Design Concept People Are On E Commerce Via Smartphone Flat Vector Illustration, Online, Shopping, Store PNG Image For Free Download.jfif"} />
        </div>


      {categories.slice(12,16).map((item : CategoriesType , index : number) => {
                  return <CategoryCard 
                  key = {index}
                  title = {item.title}
                  img = {item.img}
                  />
              })}

        <CategoryCarouselItems 
        bestSeller = {true}  
        categoryName={categories[randomCategoryItemsIndexesArray[5]].title}  />

    {categories.slice(16,categories.length).map((item : CategoriesType , index : number) => {
            return <CategoryCard 
            key = {index}
            title = {item.title}
            img = {item.img}
            />
        })}


      <ItemsCard  categoryName={categories[randomCategoryItemsIndexesArray[10]].title} />


      {new Array(3).fill(null).map((_ , index) =>{
          return <CategoryCarouselItems key={index} mostViews = {true} categoryName={categories[randomCategoryItemsIndexesArray[6 + index]].title}  />
        })}
        </div>
    </div>

  )
}
