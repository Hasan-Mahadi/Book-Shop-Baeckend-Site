import { Router } from 'express';
import { OrderController } from './order.controller';
import auth from '../../middleweres/auth';

const orderRouter = Router();

orderRouter.post('/', auth('admin', 'user'), OrderController.createOrder);
orderRouter.get('/', auth('admin', 'user'), OrderController.getOrder);
orderRouter.get(
  '/:bookId',
  auth('admin', 'user'),
  OrderController.getSingleOrder,
);
orderRouter.get('/', auth('admin', 'user'), OrderController.verifyPayment);
orderRouter.put('/:bookId', auth('admin'), OrderController.UpdateOrder);
orderRouter.delete('/:bookId', auth('admin'), OrderController.DeleteOrder);

export default orderRouter;
