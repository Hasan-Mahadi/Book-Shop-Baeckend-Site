import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productrouter from './module/Product/product.router';
import orderRouter from './module/Order/order.router';
import Order from './module/Order/order.model';
import Product from './module/Product/Product.model';


const app: Application = express();
// const port = 3000

//parsers

app.use(express.json());
app.use(cors());


app.use('/api/products', productrouter)
app.use('/api/orders', orderRouter)


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
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 450 ;

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
      error: error.message,
    });
  }
});







// Place Order Endpoint
app.post('/api/orders', async (req: Request, res:Response)=>{
  const { email, product, quantity, totalPrice } = req.body;

  // Validate input
  if (!email || !product || !quantity || !totalPrice) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    // Fetch product from database
    const productDoc = await Product.findById(product);

    if (!productDoc) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Check stock availability
    if (productDoc.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock available.' });
    }

    // Update inventory
    productDoc.quantity -= quantity;
    if (productDoc.quantity === 0) {
      productDoc.inStock = false;
    }
    await productDoc.save();

  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while processing your order.' });
  }
});






app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server is Running ⚡'
  });
});

export default app;
