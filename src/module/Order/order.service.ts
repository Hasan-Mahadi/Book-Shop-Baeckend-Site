import { TOrder } from './order.interface';
import Order from './order.model';

//post

const createOrder = async (orderload: TOrder) => {
  const result = await Order.create(orderload);
  return result;
};

// for GET ALL

const getBook = async () => {
  const result = await Order.find();
  return result;
};

// for GET SINGLE

const getSingleOrder = async (id: string) => {
  const result = await Order.findById(id);
  return result;
};

// FOR  PUT

const UpdateOrder = async (id: string, data: TOrder) => {
  const result = await Order.findByIdAndUpdate(id, data, {
    new: true,
  });

  return result;
};

// for  DELETE

const DeleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

export const OrderService = {
  createOrder,
  getBook,
  getSingleOrder,
  UpdateOrder,
  DeleteOrder,
};
