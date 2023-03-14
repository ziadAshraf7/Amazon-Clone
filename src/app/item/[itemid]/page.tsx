

export const dynamic = 'force-dynamic'
import { getItem } from '@/api/serverApi'
import ItemDetails from '@/app/item/(client)/itemDetails'
import ItemReviews from '@/app/item/(client)/itemReviews'
import CategoryCarouselItems from '@/app/(server)/categoryCarouselItems'
import ItemWrapper from '../(client)/itemWrapper'
import SwrProvider from '../(client)/swrProvider'
import getUserSession from '@/uttils/session'



async function Page({
    params
}: {
    params : {
        itemid : string
    }
}) {
    let {itemid} = params
    let item = await getItem(itemid)
    let session = await getUserSession()

  if(item.message){
    return <div className='text-xl w-fit mx-auto font-semibold'>No Item Found</div>
  }

  return (
    <SwrProvider item = {item}>
    <ItemWrapper body = {item}>
      <div>

        <div className='flex justify-center'>
          <img  className= 'object-contain  w-[500px]'  alt='' src='/21txz2trzBL.jpg'  />
        </div>

        <ItemDetails 
          item = {item}
        />

          <div className='py-5 w-[90%] mx-auto'>{<CategoryCarouselItems bestSeller = {true}  categoryName={item.category}  />}</div>
          <div className='py-5 w-[90%] mx-auto'>{<CategoryCarouselItems mostViews = {true}  categoryName={item.category}  />}</div>
        <hr></hr>
        <ItemReviews session = {session} itemid={itemid} />
      </div>
    </ItemWrapper>
    </SwrProvider>

  )
}

export default Page
