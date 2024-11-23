import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productrouter from './module/Product/product.router';
const app: Application = express();
// const port = 3000

//parsers

app.use(express.json());
app.use(cors());


app.use('/api/products', productrouter)


app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server is Running ⚡'
  });
});

export default app;
