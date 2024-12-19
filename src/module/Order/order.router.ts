import { Router } from 'express';
import { OrderController } from './order.controller';

const orderRouter = Router();

orderRouter.post('/', OrderController.createOrder);

export default orderRouter;
