
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken"
import { getSession } from "@/pages/api/createsession";
import connectMongo from "@/database/mangoose";
import User from "../database/models/userScheme"
import { CreateIndexesOptions } from "mongodb";
import Item from "@/database/models/ItemScheme";
import { itemType } from "@/types/types";



export async function getAuthenticatedUserSession(req : NextApiRequest , res : NextApiResponse, accessToken : string){
    
    if(!accessToken) return res.status(401).json({user : null})

    let decodedJwt  =  jwt.verify(accessToken, "JWTamazonClone1234", (err, decoded) => {
        return decoded ? decoded : err;
    }) as unknown as {name : string , userId : string , email : string}

    

    if(decodedJwt.name == 'JsonWebTokenError') return res.status(401).json({})

    if(req.method == "GET"){
        await connectMongo()
        let userEmail = decodedJwt.email
        try{
            User.createIndexes({email : userEmail} as CreateIndexesOptions)
            let userSession = await User.findOne({email : userEmail})
            return res.status(200).json(userSession)
        }catch(e){
            return res.status(401).json(e)
        }
    }

    if(req.method == "POST"){
        if(!req.body) return res.status(500).json("body not found")

        await connectMongo()
        let userEmail = decodedJwt.email
        let Item = JSON.parse(req.body) 
        let {type} = JSON.parse(req.body) 
        User.createIndexes({email : userEmail} as CreateIndexesOptions)
        let userData = await User.findOne({email : userEmail})
        if(type == "addtocart"){
            let quantity = Item?.quantity
            if(!userData.cart.find((cartItem : any) => cartItem._id == Item._id)){
                await User.updateOne({email : userEmail} , {cart : [{...Item , quantity : quantity ? quantity : 1} , ...userData.cart ]})
            }
            return res.end()
        }
        
        if(type == "browserHistory"){

            if(!userData.browserHistory.find((item : any) => item.id == Item.id)){
                userData.browserHistory.unshift(Item)
                userData.save()
            }
            return res.end()
        }

        if(type == "setQuantity"){
            let itemId = Item._id
            let itemIndex = userData.cart.findIndex((item : itemType) => item._id == itemId)
            let targetItem = userData.cart[itemIndex]
            userData.cart[itemIndex] = {...targetItem , quantity : Item.quantity}
            await userData.save()
            return res.end()
        }
    }

    if(req.method == "DELETE"){
        let body = JSON.parse(req.body)

        if(body.type == "cart"){
            await connectMongo()
            let userEmail = decodedJwt.email
            let itemId = JSON.parse(req.body).id 
            User.createIndexes({email : userEmail} as CreateIndexesOptions)
            let userData = await User.findOne({email : userEmail})
            userData.cart = userData.cart.filter((cartItem : itemType) => cartItem._id !== itemId)
            await userData.save()
            return res.end()
        }

        if(body.type == "browserHistory"){
            await connectMongo()
            let userEmail = decodedJwt.email
            let itemId = JSON.parse(req.body).id 
            User.createIndexes({email : userEmail} as CreateIndexesOptions)
            let userData = await User.findOne({email : userEmail})
            userData.browserHistory = userData.browserHistory.filter((cartItem : itemType) => cartItem._id !== itemId)
            await userData.save()
            return res.end()
        }

    }
}


export async function getUnAuthenticatedUserSession(req : NextApiRequest , res : NextApiResponse , cookie : String) {

    if(req.method == "GET"){
          let session = await getSession(req,res)

          return session ? res.status(200).json(session.user || {}) : res.status(500).json({})
    }
    if(req.method == "POST"){
            let session = await getSession(req,res)
            let Item = JSON.parse(req.body) 
            let {type} = Item
                    if(type == "addtocart"){
                            let itemId = Item._id
                            let quantity = Item?.quantity
                            if(!session.user.cart.find((item : itemType) => item._id == itemId) ){
                                    session.user.cart.unshift({...Item , quantity : quantity ? quantity : 1})
                            }
                    }

                    if(type == "setQuantity"){
                        let itemId = Item.id
                        let itemIndex = session.user.cart.findIndex((item : itemType) => item.id == itemId)
                        let targetItem = session.user.cart[itemIndex]
                        session.user.cart[itemIndex] = {...targetItem , quantity : Item.quantity}
                    }

                    if(type == "browserHistory"){
                            let itemId = Item.id
                            if(!session.user.browserHistory.find((item : itemType) => item.id == itemId) ){
                                    session.user.browserHistory.unshift(Item)
                            }    
                    }

            res.status(201).end()
    }

    if(req.method == "DELETE"){
        let body = JSON.parse(req.body)
        let itemId = body.id
        if(body.type == "cart"){
            let session = await getSession(req,res)
            let itemIndex = session.user.cart.findIndex((cartItem : itemType) => cartItem._id == itemId)
            session.user.cart.splice(itemIndex,1)
            res.status(201).end()
        }

        if(body.type == "browserHistory"){
            let session = await getSession(req,res)
            let itemIndex = session.user.browserHistory.findIndex((cartItem : itemType) => cartItem._id == itemId)
            session.user.browserHistory.splice(itemIndex,1)
            res.status(201).end()
        }

    }
}


async function getBrowserHistory(cookies : any , req : NextApiRequest , res : NextApiResponse ){
    let sid = cookies["sid"]
    let accessToken = cookies["__Secure-next-auth.session-token"]

    if(sid){
        return Array.from(new Set((await getSession(req , res)).user.browserHistory.map((item : itemType) => item.category))) 
    }

    if(accessToken){
        let decodedJwt = jwt.verify(accessToken, "JWTamazonClone1234", (err : any, decoded : any) => {
            return decoded ? decoded : err;
        }) as unknown as {name : string , userId : string , email : string}
       
        await connectMongo()
        let userEmail = decodedJwt.email
        let userData = await User.findOne({email : userEmail})

        return Array.from(new Set(userData.browserHistory.map((item : itemType) => item.category))) 
    }

    return []

}



export async function handleItems(req : NextApiRequest , res : NextApiResponse){

    if(req.method == "GET"){
        await connectMongo()

        if(req.query.AllitemsWithoutPaginate){
            try{
               return res.status(200).json(await Item.find() || [])

            }catch(e){
                console.log(e)
                res.status(500).json(e)
            }
        }


        if(req.query.all){

                let query : any = {}
                let sortQuery : any = {}
                let browserHistoryCategories = await getBrowserHistory(req.cookies , req , res)

                if(req.query.priceRange && req.query.priceRange !== "All"){
                    let priceRange = req.query.priceRange.split(",")
                    let max = +priceRange[1]
                    let min = +priceRange[0]
                    if(min < max){
                        query.price = {$gte : min , $lte : max}
                    }
                   }

                if(!req.query.outOfStock){
                    query.stock = {$gt : 0}
                }

                if(req.query.mostViews){
                    sortQuery.views = -1
                }
    
                if(req.query.offer){
                    query.discountPercentage = {gt : 0}
                }
    
                if(req.query.bestseller){
                    sortQuery.orders = -1
                }

                 if(req.query.rating && req.query.rating !== "All"){
                    query.rating = {$gte : +req.query.rating}
                }
    
                    if(req.query.views){
                        sortQuery.views = -1
                    }
    
                  if(req.query.sort){
                    if(req.query.sort == "high"){
                        sortQuery.price = -1
                    }
    
                    if(req.query.sort == "low"){
                        sortQuery.price = 1

                    }
    
                    if(req.query.sort == "rating"){
                        sortQuery.rating = -1
                    }
                }

               try{
                let finalData: any[] = []
                let itemsNumber

                if(!req.query["sort"] && !req.query["views"] && !req.query["rating"] && !req.query["bestseller"] && !req.query["offer"] && !req.query["mostViews"] && !req.query["outOfStock"]){
                    let sponsoredData = await Item.find({...query , category : browserHistoryCategories}).skip(req.query.page ? +req.query.page * 10 : 0 * 10).limit(10)
                    let unSponsoredData = await Item.find({...query , category : {$nin : browserHistoryCategories}}).skip(req.query.page ? +req.query.page * 10 : 0 * 10).limit(10)
                    finalData =  [...JSON.parse(JSON.stringify(sponsoredData)).map((item : any) =>{
                        return {...item , sponsored : true}
                    }) , ...unSponsoredData]
                }else{
                    finalData = await Item.find(query).sort(sortQuery).skip(req.query.page ? +req.query.page * 10 : 0 * 10).limit(10)
                }
                 itemsNumber = await Item.find(query).count()
                 return  res.status(200).json(finalData ? {items:finalData , itemsNumber : itemsNumber} : {items : [] , itemsNumber : 0})
               }catch(e){
                res.status(500).json(e)
               } 


         }


            // category query
                let category : string  = req.query.category?.includes(",") ? req.query.category.split(",") : req.query.category

                 let query : any = {}
                 let sortQuery : any = {}

                 query.category = category

                 if(!req.query.outOfStock){
                    query.stock = {$gt : 0}
                }

                if(req.query.priceRange && req.query.priceRange !== "All"){
                    let priceRange = req.query.priceRange.split(",")
                    let max = +priceRange[1]
                    let min = +priceRange[0]
                    if(min < max){
                        query.price = {$gte : min , $lte : max}
                    }
                   }

                if(req.query.mostViews){
                    sortQuery.views = -1
                }

                if(req.query.brand && req.query.brand !== "All"){
                    query.brand = req.query.brand
                }
    
                if(req.query.offer){
                    query.discountPercentage = {gt : 0}
                }
    
                if(req.query.bestseller){
                    sortQuery.orders = -1
                }

                 if(req.query.rating && req.query.rating !== "All"){
                    query.rating = {$gte : +req.query.rating}
                }
    
                    if(req.query.views){
                        sortQuery.views = -1
                    }
    
                  if(req.query.sort){
                    if(req.query.sort == "high"){
                        sortQuery.price = -1
                    }
    
                    if(req.query.sort == "low"){
                        sortQuery.price = 1

                    }
    
                    if(req.query.sort == "rating"){
                        sortQuery.rating = -1
                    }
                }

                try{
                    let finalData = await Item.find(query).sort(sortQuery).skip(req.query.page ? +req.query.page * 10 : 0 * 10).limit(10)
                    let itemsNumber = await Item.find(query).count()
     
                     return res.status(200).json(finalData ? {items:finalData , itemsNumber : itemsNumber} : {items : [] , itemsNumber : 0}) 
                }catch(e){
                    return res.status(500).json(e)
                }



    }
}



