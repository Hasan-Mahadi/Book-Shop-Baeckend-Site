import { TOrder } from './order.interface';
import Order from './order.model';

const createOrder = async (orderload: TOrder) => {
  const result = await Order.create(orderload);
  return result;
};


export const OrderService = {
  createOrder,
};
