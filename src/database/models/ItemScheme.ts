
import { Schema, model, models } from 'mongoose';
const mongoose = require('mongoose');
const ItemsSchema = new Schema({
   brand : {
      type : String , 
      require : true
   } , 
   category : {
      type : String , 
      require : true

   } , 
   description : {
      type : String ,
      require : true

   },
   discountPercentage : {
      type : Number,
      require : true

   },
   id : {
      type : Number,
      require : true

   },
   price : {
      type : Number,
      require : true

   },
   stock : {
      type : Number,
      require : true

   },
   title : {
      type : String , 
      require : true

   } ,
   globalRatings : {
      type : Number,
      require : true

   }  ,
   views : {
      type : Number ,
      require : true

   } , 
   rating : {
      type : Number , 
      require : true
   },
   orders : {
      type : Number ,
      require : true

   } ,
   images :  {
     type : Array , 
     require : true
   } , 
   thumbnail : {
      type : String , 
      require : true
   } ,
   allRatings : {
      type : Array
   },
   comments : [{type : Schema.Types.ObjectId , ref : "comment" }]
});


const Item = models.item ||  model('item', ItemsSchema);

export default Item


