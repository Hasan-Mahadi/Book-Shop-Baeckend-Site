import mongoose from 'mongoose';
import { Types } from 'mongoose';

export interface TOrder {
  email: string;
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;

  items: {
    bookId: Types.ObjectId; // ID of the book
    totalPrice: number; // Price of the book
    quantity: number; // Quantity ordered
  };
}
