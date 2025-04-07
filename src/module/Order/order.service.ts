/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from '../../app/errors/AppError';
import Product from '../Product/Product.model';
import { TUser } from '../User/user.interface';
import { TOrder } from './order.interface';
import Order from './order.model';
import { orderUtils } from './order.utils';
import { StatusCodes } from 'http-status-codes';


//post

const createOrder = async (
  user: TUser,
  payload: {
    products: { product: string; quantity: number }[];
    paymentMethod: string;
    shippingAddress: string;
    phoneNumber: string;
  },
  client_ip: string,
) => {
  if (!payload?.products?.length) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Order is not specified');
  }

  const products = payload.products;

  // Calculate total price and verify products
  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new AppError(
          StatusCodes.NOT_FOUND,
          `Product not found: ${item.product}`,
        );
      }
      if (item.quantity > product.stock) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          `Insufficient stock for product: ${product.name}`,
        );
      }

      const subtotal = product.price * item.quantity;
      totalPrice += subtotal;

      return {
        product: product._id,
        quantity: item.quantity,
      };
    }),
  );

  // Create the order
  const order = await Order.create({
    user: user._id,
    products: productDetails,
    totalPrice,
    status: 'Pending',
    shippingAddress: payload.shippingAddress,
    phoneNumber: payload.phoneNumber,
    paymentMethod: payload.paymentMethod,
  });

  // If payment method is cash on delivery, return order directly
  if (payload.paymentMethod === 'cashOnDelivery') {
    return { order };
  }

  // ShurjoPay integration for online payment
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id.toString(),
    currency: 'BDT',
    customer_name: user.name,
    customer_address: payload.shippingAddress || user.address,
    customer_email: user.email,
    customer_phone: payload.phoneNumber || user.phone,
    customer_city: user.city || 'Dhaka',
    client_ip: client_ip,
  };

  try {
    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.checkout_url) {
      // Update order with payment info
      await Order.findByIdAndUpdate(order._id, {
        $set: {
          transaction: {
            id: payment.sp_order_id,
            transactionStatus: payment.transactionStatus,
          },
        },
      });

      return { checkout_url: payment.checkout_url };
    }

    throw new AppError(StatusCodes.BAD_GATEWAY, 'Failed to initiate payment');
  } catch (error) {
    // If payment fails, update order status
    await Order.findByIdAndUpdate(order._id, { status: 'Failed' });
    throw new AppError(StatusCodes.BAD_GATEWAY, 'Payment gateway error');
  }
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
