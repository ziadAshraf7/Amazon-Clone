import connectMongo from "@/database/mangoose";
import User from "@/database/models/userScheme";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { CreateIndexesOptions } from "mongodb";
import { domain } from "@/uttils/jsUtills";



export const authOptions: NextAuthOptions = {
  secret : domain,
  providers: [ CredentialsProvider({
    name: "Credentials",

    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      const {email , password} = credentials as unknown as {
        email: string,
        password: string,
      };

      await connectMongo()
      User.createIndexes({email : email} as CreateIndexesOptions)
      let user = await User.findOne({email : email})
  

      if(!user){
         throw new Error("this email does not exist")
      }

      let passwordValidate = await bcrypt.compare(password , user.password)

      if(!passwordValidate){
        throw new Error("wrongPassword")
      }

      return user

    }
  })]
  ,
    jwt : {
      secret : process.env.Jwt_Secret ,
      maxAge : 60000000 ,
      async encode({ secret, token }) {
        return jwt.sign(token as unknown as string, secret)
      },
      async decode({ secret, token }) {
        return jwt.verify(token  , secret)
      },
    },
    session : {
      maxAge : 60000000 ,
      updateAge: 24 * 60 * 60 ,
    },
      callbacks: {
        async jwt({token, user}){
          if(user){
            token.userId = user._id
          }
          return token
        },
        async session({ session,  }) {
          return session
        },
        async redirect({ baseUrl }) {
          return baseUrl
        }
      }
}

export default NextAuth(authOptions)


