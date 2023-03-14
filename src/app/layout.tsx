
export const dynamic = 'force-dynamic'

import Header from "./(client)/Header"
import { getItems, getCategories } from '@/api/serverApi'
import AppProvider from './appProvider';
import { Session } from 'next-auth';
import { cookies } from 'next/headers';
import RelatedViewedItemsCarousell from './(server)/relatedViewedItemsCarousell';
import { getCartItemsCount } from '@/uttils/jsUtills';
import BrowserHistoryCarousell from './(server)/browserHistoryCarousell';
import Footer from "./(client)/footer";

import 'react-modern-drawer/dist/index.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.min.css'
import "swiper/swiper.min.css";
import './globals.css'
import getUserSession from "@/uttils/session";
import LoginSignupSection from "./(client)/loginSignupSection";



export default async function RootLayout({
  children,
  session ,
}: {
  children: React.ReactNode , 
  session : Session 
}) {
  
  const nextCookies = cookies();
  let accessToken = nextCookies.get(process.env.ACCESSTOKENKEY as string)
  let Categories = await getCategories()


  let AllItems = await getItems({
    AllitemsWithoutPaginate : true
  })

  let userSession = await getUserSession()

  let cartItemsCount = getCartItemsCount(userSession?.cart ? userSession.cart : [])

  let categoriesUserViewed : Set<string[]> | any[] = userSession?.browserHistory?.length > 0 ?
  new Set<string[]>(userSession.browserHistory?.map((item : any) => item.category)) : []


  return (
    <html lang="en">
      
       <body >
       <AppProvider userSession = {userSession} accessToken = {accessToken?.value} session={session}>
        <div className="flex flex-col">
          <Header 
            user = {userSession}
            Categories = {Categories}
            AllItems = {AllItems}
            cartItemsCount = {cartItemsCount > 0 ? cartItemsCount : 0}
          />
          {children}
            <LoginSignupSection userSession={userSession} />
             {Array.from(categoriesUserViewed).length > 0 && <BrowserHistoryCarousell categoryName={Array.from(categoriesUserViewed)[Math.floor(Math.random() * Array.from(categoriesUserViewed).length)]}  bestSeller={true} />}
              {Array.from(categoriesUserViewed).length > 0 && <RelatedViewedItemsCarousell 
                                   mostViews = {true} 
                                   category={Array.from(categoriesUserViewed)}
               />}
               <Footer />
           </div>

          </AppProvider>
       </body>
    </html>
  )
}
