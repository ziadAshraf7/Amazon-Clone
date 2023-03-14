





import getUserSession from '@/uttils/session'
import React from 'react'
import BrowserHistoryWrapper from './(client)/browserHistoryWrapper'
import SwrProvider from './(client)/swrProvider'

async function Page() {
    let session = await getUserSession()
    let browserHistory = session?.browserHistory || []
  return (
    <SwrProvider browserHistory = {browserHistory}>
        <div className='p-5  '>
            <div className='text-3xl font-semibold'>Your Browser History</div>
          <BrowserHistoryWrapper />
        </div>
    </SwrProvider>
  )
}

export default Page















