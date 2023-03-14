













import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../createsession'
import jwt from "jsonwebtoken"
import User from '@/database/models/userScheme'


        export default async function handler(
            req: NextApiRequest,
            res: NextApiResponse
          ) {


            if(req.method == "GET"){
                let accessToken = req.cookies[process.env.ACCESSTOKENKEY as string]

                let session = await getSession(req,res)

                let decodedJwt  =  jwt.verify(accessToken as string, "JWTamazonClone1234", (err, decoded) => {
                    return decoded ? decoded : err;
                }) as unknown as {name : string , userId : string , email : string , cart : any[]}

                let authenticatedUserData = await User.findOne({email : decodedJwt.email})
                let authenticatedUserCart = authenticatedUserData.cart
                let authenticatedUserBrowserHistory = authenticatedUserData.browserHistory


                session.user.cart.forEach(async (item1 : any ) => {
                    if(authenticatedUserCart.every((item2 : any) => item2._id !== item1._id )){
                        authenticatedUserData.cart.push(item1)
                    }   
                })

                session.user.browserHistory.forEach(async (item1 : any ) => {
                    if(authenticatedUserBrowserHistory.every((item2 : any) => item2._id !== item1._id )){
                        authenticatedUserData.browserHistory.push(item1)
                    }   
                })

                authenticatedUserData.save()
                session.destroy()
                res.status(201).end()
            }

          }


