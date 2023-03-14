


import { handleItems } from '@/uttils/serverUtills'
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[] | string>
) {
    await handleItems(req , res)
}






