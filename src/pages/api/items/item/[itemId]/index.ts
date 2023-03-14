



import connectMongo from '@/database/mangoose'
import Comment from '@/database/models/commentSchema'
import Item from '@/database/models/ItemScheme'
import User from '@/database/models/userScheme'
import { CreateIndexesOptions } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    let {itemId} = req.query
    await connectMongo()
    new Comment()
    new User()
    Item.createIndexes({ _id: itemId } as CreateIndexesOptions)

    if(req.method == "GET"){
      try{
        let data = await Item.findById({_id : itemId}).populate({path : "comments" , populate : {path : "author"} , options : {sort : {rating : -1}}})
        res.status(200).json(data)
      }catch(e){
        res.status(402).json(e)
      }
    }

  }


