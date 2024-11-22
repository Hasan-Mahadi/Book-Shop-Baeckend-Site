import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
// const port = 3000

//parsers

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server is Running ⚡'
  });
});

export default app;
