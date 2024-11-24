import { Router } from "express";
import { OrderController } from "./order.controller";

const orderRouter = Router()
   
orderRouter.post("/create-order", OrderController.createOrder)

export default orderRouter;