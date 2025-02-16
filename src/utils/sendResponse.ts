import { Response } from 'express';

type TSuccessRespons<T> = {
  success: boolean;
  status?: boolean;
  message: string;
  token?: string;
  statusCode: number;
  data: T;
};

const sendResponse = <T>(res: Response, data: TSuccessRespons<T>) => {
  res.status(data.statusCode).json({
    success: true,
    message: data.message,
    statusCode: data.statusCode,
    // author: req.user,
    token: data.token,

    data: data.data,
  });
};

export default sendResponse;
