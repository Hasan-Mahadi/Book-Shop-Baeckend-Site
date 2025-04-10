import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productrouter from './module/Product/product.router';
import orderRouter from './module/Order/order.router';
import Order from './module/Order/order.model';
// import cookieParser from 'cookie-parser';

import userRouter from './module/User/user.router';
import authRoute from './module/auth/auth.router';
const app: Application = express();

// const port = 3000

//parsers

app.use(express.json());
// app.use(cookieParser());
// app.use(cors({origin: 'http://localhost:5173',}));
const corsOptions = {
  origin: 'https://book-shop-app-five.vercel.app', //front url
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true,
  // allowedHeaders: ['Content-Type', 'Authorization'], // Allow the Authorization header
};

app.use(cors(corsOptions));

app.use('/api/products', productrouter);
app.use('/api/orders', orderRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRoute);

// API endpoint
app.get('/api/orders/revenue', async (req, res) => {
  try {
    // MongoDB Aggregation Pipeline
    const revenueResult = await Order.aggregate([
      {
        $unwind: '$items', // Deconstruct items array for processing
      },
      {
        $group: {
          _id: null, // No specific grouping key
          totalRevenue: {
            $sum: {
              $multiply: ['$items.totalPrice', '$items.quantity'], // Calculate revenue for each item
            },
          },
        },
      },
    ]);

    // Extract total revenue
    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 450;

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error) {
    console.error('Error calculating revenue:', error);
    res.status(500).json({
      message: 'Failed to calculate revenue',
      status: false,
      error: (error as Error).message,
    });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server is Running ⚡',
  });
});

export default app;
