

import connectMongo from '@/database/mangoose'
import Comment from '@/database/models/commentSchema'
import Item from '@/database/models/ItemScheme'
import User from '@/database/models/userScheme'
import { CreateIndexesOptions } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    await connectMongo().catch(err => res.status(500).json(err))

    if(req.method == "GET"){
        let {sort , itemId , search} = req.query
        const sortQuery : any = {}
        let limit = false
        if(sort == "topReviews" || req.query.rating == "All"){
            sortQuery.rating = -1
        }

        if(sort == "mostRecent"){
            sortQuery.created_at = -1
        }

        if(search == "topReview"){
            sortQuery.rating = -1
            limit = true
        }

        if(search == "criticalReview"){
            sortQuery.rating = 1
            limit = true
        }

        try{
            Comment.createIndexes({item : itemId } as CreateIndexesOptions)
            let reviews = limit ? await Comment.find({item : itemId }).sort(sortQuery).populate({path : "author"}).limit(1) :
            await Comment.find({item : itemId }).sort(sortQuery).populate({path : "author"})

            if(!reviews){
               return res.status(500).json([])
            }

            return res.status(200).json(reviews)

        }catch(e){
           return res.status(500).json(e)
        }

    }

    if(req.method == "DELETE"){
        let {reviewId} = JSON.parse(req.body)
            Comment.findOneAndDelete({_id : reviewId}).exec((err) =>{
            if(err) return res.status(500).json("something went wrong")
            return res.status(201)
        })
    }

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

    if(req.method == "POST"){
        let body = JSON.parse(req.body)
        let itemId = body.id
        User.createIndexes({_id : body.userId} as CreateIndexesOptions)
        let user = await User.findById(body.userId)

        if(!user){
            res.status(401).json("unAAuthenticated")
        }

        if(user){
            let newComment =  new Comment({
                comment : body.comment , 
                rating : body.rating ,
                author : body.userId ,
                item : itemId
            })
             
        newComment.save(async(err:any , comment : any) =>{
            if(!err){
                User.createIndexes({_id : body.userId} as CreateIndexesOptions)
                Item.createIndexes({_id : itemId} as CreateIndexesOptions)
                
                let item = await Item.findById(itemId)
                
                user.reviews.unshift(comment)
                item.allRatings.unshift(comment.rating)
                item.globalRatings += 1
                item.rating = item.rating  + (comment.rating / item.globalRatings)
                item.comments.unshift(comment)
                item.save()
                return res.status(201).json("success")
            }
            return res.status(500).json(err)
        })
    }
    }

  }

















