import { Request, Response } from 'express';
import { OrderService } from './order.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { TUser } from '../User/user.interface';
import Order from './order.model';
import AppError from '../../app/errors/AppError';

//post

// const createOrder = catchAsync(async (req: Request, res: Response) => {
// try {
// const body = req.body;
// const result = await OrderService.createOrder(body);
//
// res.json({
// message: 'Order created successfully',
// success: true,
// data: result,
// });
// } catch (error) {
// res.send({
// success: false,
// message: 'Something went worng',
// error,
// });
// }
// });
//

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  console.log(req.body);
  const order = await OrderService.createOrder(
    user as TUser,
    req.body,
    req.ip!,
  );

  sendResponse(res, {
    message: 'Order created successfully',
    statusCode: StatusCodes.CREATED,
    data: order,
    success: true,
  });
});

//get all

const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderService.getOrder();

    res.send({
      status: true,
      message: 'Order retrieved successfully',
      data: order,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      stack:
        process.env.NODE_ENV === 'development' ? (error as Error) : undefined,
      error,
    });
  }
};

//payment

// const verifyPayment = catchAsync(async (req, res) => {
// const order = await OrderService.verifyPayment(req.query.order_id as string);
//
// sendResponse(res, {
// statusCode: StatusCodes.CREATED,
// message: 'Order verified successfully',
// data: order,
// success: true,
// });
// });
//
//

// order.controller.ts
const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.body;
  const result = await OrderService.verifyPayment(orderId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment verified successfully',
    data: result,
  });
});

//Method: GET   SINGLE

// const getSingleOrder = async (req: Request, res: Response) => {
// try {
// const bookId = req.params.bookId;
// const result = await OrderService.getSingleOrder(bookId);
//
// res.send({
// status: true,
// message: 'Books retrieved successfully',
// result,
// });
// } catch (error) {
// res.json({
// status: false,
// message: 'Something went wrong',
// stack:
// process.env.NODE_ENV === 'development' ? (error as Error) : undefined,
// error,
// });
// }
// };

// order.controller.ts
// const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
// const order = await Order.findOne({
// $or: [
// { _id: req.params.id },
// { shurjopayOrderId: req.params.id }
// ]
// }).populate('user products.product');
//
// if (!order) {
// throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
// }
//
// sendResponse(res, {
// statusCode: StatusCodes.OK,
// success: true,
// message: 'Order retrieved successfully',
// data: order,
// });
// });

import mongoose from 'mongoose';

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if it's a valid MongoDB ID or ShurjoPay ID
  let order;
  if (mongoose.Types.ObjectId.isValid(id)) {
    order = await Order.findById(id).populate('user products.product');
  } else {
    // Handle ShurjoPay ID case
    order = await Order.findOne({
      $or: [{ 'transaction.id': id }, { shurjopayOrderId: id }],
    }).populate('user products.product');
  }

  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: order,
  });
});
//Method: PUT

const UpdateOrder = catchAsync(async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const body = req.body;
    const result = await OrderService.UpdateOrder(bookId, body);

    res.send({
      status: true,
      message: 'Book updated successfully',
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      stack:
        process.env.NODE_ENV === 'development' ? (error as Error) : undefined,
      error,
    });
  }
});

//Method: DELETE

const DeleteOrder = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    await OrderService.DeleteOrder(bookId);

    res.send({
      status: true,
      message: 'Books deleted successfully',
      result: {},
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      stack:
        process.env.NODE_ENV === 'development' ? (error as Error) : undefined,
      error,
    });
  }
};

export const OrderController = {
  createOrder,
  getOrder,
  verifyPayment,
  getSingleOrder,
  UpdateOrder,
  DeleteOrder,
};
