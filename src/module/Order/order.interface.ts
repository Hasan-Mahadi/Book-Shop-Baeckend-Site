import mongoose from 'mongoose';
import { Types } from 'mongoose';

export interface TOrder {
  user: Types.ObjectId;
  _id?: string;
 

  products: {
    product: Types.ObjectId;
    quantity: number;
    
  }[];
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
shurjopayOrderId:string;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  email: string;
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
   shippingAddress: string;
   phoneNumber:string;
   paymentMethod:string;
  createdAt: Date;
  updatedAt: Date;

  items: {
    bookId: Types.ObjectId; // ID of the book
    totalPrice: number; // Price of the book
    quantity: number; // Quantity ordered
  };
}
