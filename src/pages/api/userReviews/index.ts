









import { NextApiRequest, NextApiResponse } from "next/types";
import connectMongo from "@/database/mangoose";
import Comment from "@/database/models/commentSchema";
import jwt from "jsonwebtoken"
import { CreateIndexesOptions } from "mongodb";



export default async function handler(            
    req: NextApiRequest,
    res: NextApiResponse){

        if(req.method == "PATCH"){
            let body = JSON.parse(req.body)
            try{
                Comment.createIndexes({_id : body.reviewId} as CreateIndexesOptions)
                await Comment.updateOne({_id : body.reviewId} , {comment : body.comment , rating : body.rating})
                return res.status(201)
            }catch(e){
               return res.status(500).json(e)
            }
            
        }

        if(req.method == "DELETE"){
            let {reviewId} = JSON.parse(req.body)
             Comment.findOneAndDelete({_id : reviewId}).exec((err) =>{
                if(err) return res.status(500)
                return res.status(201).json("success")
             })
        }

        if(req.method == "GET"){
            let accessToken = req.cookies[process.env.ACCESSTOKENKEY as string]
            if(!accessToken) return res.status(401)
            let decodedJwt = jwt.verify(accessToken, "JWTamazonClone1234", (err : any, decoded : any) => {
                return decoded ? decoded : err;
            }) as unknown as {name : string , userId : string , email : string}
           
            if(decodedJwt.name == 'JsonWebTokenError') return res.status(401)

            let userId = decodedJwt.userId

            await connectMongo()

            let userReviews =  (await Comment.find({author : userId}).populate({path : "item"}).populate({path : "author"}).sort({created_at : -1}))

            res.status(200).json(userReviews || [])
        }


}



