import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    stock: { type: Number, required: true },

    author: {
      type: String,
      required: [true, 'please give author'],
    }, //The author of the book.

    price: {
      type: Number,
      required: [true, 'please give price number'],
    }, // Price of the book.

    category: {
      type: String,
      enum: {
        values: [
          'Fiction',
          'Science',
          'SelfDevelopment',
          'Poetry',
          'Religious',
        ],
        message: '{VALUE} is not right plz provide exact value',
      }, // Enum validation
      required: [true, 'please give category'], // Ensures category is always provided
    },
    // error:String,

    //The genre or category of the book.

    description: String, // A brief description of the book.

    quantity: {
      type: Number,
      required: [true, 'please give quantity number'],
    }, //Quantity of the book available.

    inStock: Boolean, //Indicates if the book is in stock.

    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

const Product = model<TProduct>('Product', productSchema);
export default Product;
