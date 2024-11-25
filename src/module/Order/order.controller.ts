import { Request, Response } from 'express';
import { OrderService } from './order.service';
const createOrder = async (req: Request, res: Response) => {
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
};

export const OrderController = {
  createOrder,
};
