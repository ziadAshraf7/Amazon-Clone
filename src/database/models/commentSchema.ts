



import  { Schema, model, models } from 'mongoose';

const commentSchema = new Schema({
    author : {
        type : Schema.Types.ObjectId , 
        ref : "User"
    } ,
    comment : {
        type : String , 
        required : true
    }, 
    rating : {
        type : Number
    } , 
    item : {
        type : Schema.Types.ObjectId ,
        ref : "item"
    }
},{ timestamps: { createdAt: 'created_at' ,     updatedAt: 'updated_at'
}});


const Comment = models.comment || model('comment', commentSchema);

export default Comment











