import { model, Schema } from "mongoose";

const productSchema = new Schema({

    title: {
        type: String,
        required: true,
    },  //The title of the book.

    author: String,  //The author of the book.

    price: {
        type:Number,
        required: true,
    },     // Price of the book.

    category:{
     type: String,
     enum: " Fiction |  Science | SelfDevelopment  | Poetry | Religious ",
    },            //The genre or category of the book.

     description: String,   // A brief description of the book.

     quantity:{
        type: Number,
         required: true,
     },    //Quantity of the book available.

     inStock: Boolean    //Indicates if the book is in stock.



})

  const Product = model('Product', productSchema)
  export default Product;