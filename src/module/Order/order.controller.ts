import { Request, Response } from 'express';
import { OrderService } from './order.service';
import catchAsync from '../../utils/catchAsync';

//post

const createOrder = catchAsync(async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await OrderService.createOrder(body);

    res.json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went worng',
      error,
    });
  }
});

//get all

const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getBook();

    res.send({
      status: true,
      message: 'Order retrieved successfully',
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
};

//Method: GET   SINGLE

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const result = await OrderService.getSingleOrder(bookId);

    res.send({
      status: true,
      message: 'Books retrieved successfully',
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
};

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
  getSingleOrder,
  UpdateOrder,
  DeleteOrder,
};
