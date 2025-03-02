import AppError from '../../app/errors/AppError';
import Product from '../Product/Product.model';
import { TUser } from '../User/user.interface';
import { TOrder } from './order.interface';
import Order from './order.model';
import { orderUtils } from './order.utils';
import { StatusCodes } from 'http-status-codes';

//post

// const createOrder = async (orderload: TOrder) => {
// const result = await Order.create(orderload);
// return result;
// };

const createOrder = async (
  user: TUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string,
) => {
  if (!payload?.products?.length)
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Order is not specified');

  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findById(item.product);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    }),
  );

  let order = await Order.create({
    user,
    products: productDetails,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: user.address,
    customer_email: user.email,
    customer_phone: user.phone,
    customer_city: user.city,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

// for GET ALL

const getOrder = async () => {
  const data = await Order.find();
  return data;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

// for GET SINGLE

const getSingleOrder = async (id: string) => {
  const data = await Order.findById(id);
  return data;
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
  getOrder,
  verifyPayment,
  getSingleOrder,
  UpdateOrder,
  DeleteOrder,
};
