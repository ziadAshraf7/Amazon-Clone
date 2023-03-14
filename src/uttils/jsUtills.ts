import { itemType } from "@/types/types"
import { Query } from "mongoose"
import { NextApiRequest } from "next/types"


export const domain = "amazon-liart-six.vercel.app"
export const SERVERURL = "https://amazon-liart-six.vercel.app"

 export function generateRandomNumbers(itemsArray : any[]){
    let randomNumbers : number[] = []
  
    while(randomNumbers.length < itemsArray.length){
      let randomNumber = Math.floor(Math.random() * itemsArray.length)

      if(!randomNumbers.includes(randomNumber)){
        randomNumbers.push(randomNumber)
      }

    }

    return randomNumbers
  }


  export async function addtoCart(body : any){
    
   return await fetch(SERVERURL+"/api/session" , {
      method : "POST" , 
      body : JSON.stringify({
        type : "addtocart" ,
        ...body
      })
    })
    }

    export async function ItemCartQuantityChange(_id : number | string , quantity : number){
      await fetch(SERVERURL+"/api/session" , {
        method : "POST" , 
        body : JSON.stringify({
          type : "setQuantity" ,
          _id ,
          quantity
        })
      })
      }

    export async function deleteFromCart(id : any){
     return await fetch(SERVERURL+"/api/session" , {
        method : "DELETE" , 
        body : JSON.stringify({
          type : "cart",
          id
        })
      })
      }


      export async function deleteFromBrowserHistory(id : any[]){
        return await fetch(SERVERURL+"/api/session" , {
           method : "DELETE" , 
           body : JSON.stringify({
            type : "browserHistory",
             id
           })
         })
         }
  
      export  function checkItemStock(stock :number , quantity : number):boolean{
        if(quantity > stock){
          return false
        }
        return true
      }


      export function getCartItemsCount(cartItems : any){
        return cartItems?.reduce((ack :number , item : any) =>{
          ack += item.quantity
          return ack
        },0)
      }


      export function calcCartSubTotalCash(cartItems : any){
        return cartItems.reduce((ack :number , item : any) =>{
          ack += item?.discountPercentage > 0 ? Math.ceil(item.price * (item.discountPercentage / 100)) * item.quantity : item.price * item.quantity 
          return ack
        },0)
      }


      export function filterItemsQueries(req : NextApiRequest){
        return Object.entries(req.query).reduce((ack : any , item ) =>{
          if((item[0] !== "bestseller" ) && (item[0] !== "rating") && (item[0] !== "outOfStock") && (item[0] !== "page") && (item[0] !== "all")){
              ack[item[0]] = item[1]
          }
          return ack
        },{})
      }



      export function handlePagination(data: Query<any[], any, {}, any>,limit:any,page : any){
          return data.skip(page * limit).limit(limit)
      }



      export function handleURLRedirection(pathName : string , searchParams : any , query : {key? : string , value? : string | undefined , page? : number | null} | undefined , paramToBeRemoved : string | undefined){


        if(paramToBeRemoved){
          let url : string = `${pathName}`
          let index = 0
          for(let [key , value] of searchParams.entries()){
              if(key !== paramToBeRemoved ){
                url += `${index == 0 ? "?" : "&"}${key}${value ? `=${value}` : ""}`
                index++
              }
          }
          return url
        }

        let queryKey = query?.key
        let queryValue = query?.value
        let page = query?.page
        let isQueryKeyExistInSearchParams = searchParams.has(queryKey)


        if(queryKey == undefined && queryValue == undefined){ // case of page changes only
          let url : string = `${pathName}`
          let index = 0
          for(let [key , value] of searchParams.entries()){
              if( key !== "page" ){
                url += `${index == 0 ? "?" : "&"}${key}${value ? `=${value}` : ""}`
                index++
              }else{
                if(key == "page"){
                  url += `${index == 0 ? "?" : "&"}page${`=${page}` }`
                  continue
                }
              }
          }
          return url.includes("page") ? url : url + `&page=${page}`  
        }

        if(isQueryKeyExistInSearchParams){
          let url : string = `${pathName}`
          let index = 0
          for(let [key , value] of searchParams.entries()){
              if(key !== queryKey && key !== "page" ){
                url += `${index == 0 ? "?" : "&"}${key}${value ? `=${value}` : ""}`
                index++
              }else{
                if(key == "page"){
                  url += `${index == 0 ? "?" : "&"}page${`=${page}` }`
                  continue
                }
                url += `${index == 0 ? "?" : "&"}${key}${queryValue ? `=${queryValue}` : ""}`
              }
          }

          return url.includes("page") ? url : url + `&page=${page}`  
        }
       
        return `${pathName}?${searchParams.toString()}&${queryKey}${queryValue ? `=${queryValue}` : "" }${searchParams.toString().includes("page") ? "" : `&page=${page}`}`

      }


      export  function calcRatingPercentage(rating : number , item : any){
        let ratingArr = item.allRatings.filter((ratingNum : any) => +String(ratingNum)[0] == rating)
        return (ratingArr.length / item.allRatings.length) * 100
      }
    


      export   function isUserReviewedProduct(item : any , session : any){
        let user = item.comments.find((comment : any) => comment?.author?._id == session._id)
        return user ? true : false
      }