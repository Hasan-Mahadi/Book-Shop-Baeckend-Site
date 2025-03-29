import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    rating: { type: Number },
    stock: { type: Number, required: true },
    image: { type: String, required: true }, // Image field added

    author: {
      type: String,
      required: [true, 'please give author'],
    },

    price: {
      type: Number,
      required: [true, 'please give price number'],
    },

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
      },
      required: [true, 'please give category'],
    },

    description: String,

    quantity: {
      type: Number,
      required: [true, 'please give quantity number'],
    },

    inStock: Boolean,
  },
  {
    timestamps: true,
  },
);

const Product = model<TProduct>('Product', productSchema);
export default Product;
