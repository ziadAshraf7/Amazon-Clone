
import { getAuthenticatedUserSession, getUnAuthenticatedUserSession } from '@/uttils/serverUtills'
import type { NextApiRequest, NextApiResponse } from 'next'


        export default async function handler(
            req: NextApiRequest,
            res: NextApiResponse
          ) {

                let sid = undefined
                let accessToken = undefined


                   sid = req.cookies["sid"]
                   accessToken = req.cookies[process.env.ACCESSTOKENKEY as string]
            
                if(accessToken ){
                   return await getAuthenticatedUserSession(req , res , accessToken)
                }
                if(sid) {
                  return await getUnAuthenticatedUserSession(req,res , sid)
               }

                return res.status(500).json("bad request")


          }


