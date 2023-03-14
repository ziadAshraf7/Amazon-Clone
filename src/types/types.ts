



export type CategoriesType = {
    title : string , 
    img : string
}

export type userType = {
    _id : string ,
    name : string , 
    email : string , 
    password : string , 
    cart : itemType[] , 
    orders : itemType[] ,
    browserHistory : itemType[] ,
    reviews : commentType ,
}


export type commentType = {
    _id : string ,
    author : userType , 
    comment : string , 
    rating : number , 
    item : itemType ,
    created_at : string ,
    updated_at : string , 
}

export type itemType = {
    _id : string ,
    brand : string , 
    category : string , 
    description : string ,
    discountPercentage : number ,
    id : string , 
    price : number , 
    stock : number ,
    title : string ,
    globalRatings : number ,
    views : number , 
    rating : number ,
    orders : number ,
    images : string[] ,
    allRatings : number[] ,
    comments : commentType[] ,
    sponsored : boolean ,
    quantity : number
}