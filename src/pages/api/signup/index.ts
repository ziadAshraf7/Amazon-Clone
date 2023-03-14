import connectMongo from "@/database/mangoose";
import User from "@/database/models/userScheme";
import { NextApiRequest, NextApiResponse } from "next/types";








export default async function handler(            
    req: NextApiRequest,
    res: NextApiResponse){

        let {name , email , password} = JSON.parse(req.body) 

        if(!name || !email || !password){
          return res.status(403).json("Bad")
        }


        if(req.method == "POST"){
            await connectMongo()

          let newUser =  new User(
            {
            ...JSON.parse(req.body),
            cart : [] ,
            orders : [],
            browserHistory : [] ,
            reviews : [] ,
            lists : [] 
           })


          newUser.save((err : any ) =>{
            if(err){
              let emailError = err.code == 11000 ? "this email is already in use" : null
              let passwordError = err.errors?.password ? err.errors.password.properties.message : null
              emailError = err.errors?.email ? err.errors?.email.properties.message : emailError
              let nameError = err.errors?.name ? err.errors?.name.properties.message : null
              return res.status(403).json({nameError :nameError, emailErr : emailError , passwordErr : passwordError})
            }
           return res.status(201).json("done")
          })

        }


 

}






