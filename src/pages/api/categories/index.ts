// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from '@/database/mangoose'
import Category from '@/database/models/categoryScheme'
import { CategoriesType } from '@/types/types'
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CategoriesType[] | string>
) {

  if(req.method == "GET"){
    await connectMongo()
      Category.find().exec((err , data) =>{
      if(err) return res.status(500)
      return res.status(200).json(data)
    })
  }
}
