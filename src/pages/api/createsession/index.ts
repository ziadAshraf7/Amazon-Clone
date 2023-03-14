
import type { NextApiRequest, NextApiResponse } from 'next'
import nextSession from "next-session";
import { promisifyStore } from "next-session/lib/compat";
import MongoStore from 'connect-mongo';
import { domain } from '@/uttils/jsUtills';


export const getSession = nextSession({
    cookie : {
      domain : domain,
      maxAge : 2 * 12 * 30 * 24 * 60 * 60 * 1000,
    },
    store: promisifyStore(
      new MongoStore({
        collectionName : "sessions",
        mongoUrl : process.env.MONGO_URI
      })
    ), 
  })


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if(req.method == "GET"){
      let session = await getSession(req,res)
        if(!session.user){
            session.user = {
              cart : [] ,
              orders : [],
              browserHistory : [] ,
              reviews : [] ,
              lists : []
          }
        }

      return res.end()
    }

    res.status(500).json("Bad request")
  }




