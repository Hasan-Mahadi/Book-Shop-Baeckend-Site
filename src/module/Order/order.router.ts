import { Router } from 'express';
import { OrderController } from './order.controller';
import auth from '../../middleweres/auth';

const orderRouter = Router();

orderRouter.post('/', auth('admin', 'user'), OrderController.createOrder);
orderRouter.get('/', auth('admin', 'user'), OrderController.getOrder);
orderRouter.get(
  '/:id',
  auth('admin', 'user'),
  OrderController.getSingleOrder,
);
orderRouter.get('/', auth('admin', 'user'), OrderController.verifyPayment);
orderRouter.post('/verify-payment', OrderController.verifyPayment);
orderRouter.patch('/:id', auth('admin'), OrderController.UpdateOrder);
orderRouter.delete('/:bookId', auth('admin'), OrderController.DeleteOrder);

export default orderRouter;
