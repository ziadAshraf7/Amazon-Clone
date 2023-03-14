





import Comment from '@/database/models/commentSchema'
import Item from '@/database/models/ItemScheme'
import User from '@/database/models/userScheme'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method == "PATCH"){
        let body = JSON.parse(req.body)
        let userReview = await Comment.findById({_id : body.reviewId})
        userReview.comment = body.comment
        userReview.rating = body.rating
        await userReview.save()
        res.end()
    }

    if(req.method == "POST"){
        let body = JSON.parse(req.body)
        let itemId = body.id
        let newComment =  new Comment({
            comment : body.comment , 
            rating : body.rating ,
            author : body.userId ,
            itemId : itemId
        })
        newComment.save(async(err:any , comment : any) =>{
            if(!err){
                User.createIndexes(body.userId)
                Item.createIndexes(itemId)

                let user = await User.findById(body.userId)
                let item = await Item.findById(itemId)

                if(user){
                    user.reviews.push(comment)
                    user.save()
                }
                item.allRatings.push(comment.rating)
                item.globalRatings += 1
                item.rating = item.rating  + (comment.rating / item.globalRatings)
                item.comments.push(comment)
                item.save()
               return res.status(201).json("success")
            }
           return res.status(400)
        })
    }

    }













