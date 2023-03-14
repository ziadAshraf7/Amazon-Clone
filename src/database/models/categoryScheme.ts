
import { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema({
    title : {
        type : String
    } , 
    img : {
        type : String
    }
});


const Category = models.Category || model('Category', CategorySchema);

export default Category


