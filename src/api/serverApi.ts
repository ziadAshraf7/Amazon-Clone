import { SERVERURL } from "@/uttils/jsUtills"


export async function getCategories(){
    return  await (await fetch(SERVERURL+"/api/categories")).json()
}

export async function getItems(params? : {
    all? : boolean ,
    AllitemsWithoutPaginate? : boolean ,
    mostViews? : boolean , 
    outOfStock? : boolean , 
    sort? : string ,
    category? : string[] | string , 
    bestSeller? : boolean , 
    rating? : number , 
    offer? : string , 
    brand? : string , 
    page? : string , 
    userToken? : any ,
    priceRange? : string
}){
    let category   = Array.isArray(params?.category) ? params?.category.join(",") : params?.category
    let all = params?.all
    let bestSeller = params?.bestSeller
    let rating = params?.rating
    let offer = params?.offer
    let brand = params?.brand
    let sort = params?.sort
    let outOfStock = params?.outOfStock
    let mostViews = params?.mostViews
    let page = params?.page
    let priceRange = params?.priceRange
    let AllitemsWithoutPaginate = params?.AllitemsWithoutPaginate

    if(AllitemsWithoutPaginate){
        return await (await fetch(SERVERURL+`/api/items?AllitemsWithoutPaginate=true`)).json()
    }

    if(all) return await (await fetch(SERVERURL+`/api/items?all=true&${bestSeller?"&bestseller=true":""}${rating ? `&rating=${rating}` : ""}${offer ? "&offer" : ""}${brand ? `&brand=${brand}` : ""}${sort ? `&sort=${sort}` : ""}${outOfStock ? `&outOfStock=${true}` : ""}${mostViews ? "&mostViews=true" : ""}${page ? `&page=${page}` : ""}${priceRange ? `&priceRange=${priceRange}` : ""}` , {
        headers : {
            cookie : `${params?.userToken?.name}=${params?.userToken?.value}`
        }
    })).json()

    return  await (await fetch(SERVERURL+`/api/items?${category ? `category=${category}` : ""}${bestSeller?"&bestseller=true":""}${rating ? `&rating=${rating}` : ""}${offer ? "&offer" : ""}${brand ? `&brand=${brand}` : ""}${sort ? `&sort=${sort}` : ""}${outOfStock ? `&outOfStock=${true}` : ""}${mostViews ? "&mostViews=true" : ""}${page ? `&page=${page}` : ""}${priceRange ? `&priceRange=${priceRange}` : ""}`)).json()
}

export async function getCategoriesItems(categoryTitle : any){
    return  await (await fetch(SERVERURL+`/api/items/categoryName/${categoryTitle}`)).json()
}


export async function getItem(id : string){
    return  await (await fetch(SERVERURL+`/api/items/item/${id}`)).json()
}


