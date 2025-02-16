import mongoose, { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],

    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },
    email: {
      type: String,
      required: [true, 'please enter email'],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      //  ref: 'Product', // References the 'Product' model
      required: true,
    },

    quantity: {
      type: Number,
      required: [true, 'please enter quantity'],
      default: 1,
    },

    items: {
      bookId: mongoose.Schema.Types.ObjectId,
      totalPrice: Number, // Price of the book
      quantity: Number, // Quantity ordered
    },
    totalPrice: Number,

    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

const Order = model<TOrder>('Order', orderSchema);

export default Order;
