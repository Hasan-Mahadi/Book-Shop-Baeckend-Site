// req and res manages
import { Request, Response } from 'express';
import { BookService } from './product.service';
import catchAsync from '../../utils/catchAsync';

//Method: POST
const createBook = catchAsync(async (req: Request, res: Response) => {
  try {
    const bookload = req.body;

    if (!bookload.image) {
      res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const result = await BookService.createBook(bookload);
    res.json({
      message: 'Book created successfully',
      success: true,

      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      stack:
        process.env.NODE_ENV === 'development'
          ? (error as Error).stack
          : undefined,
      error,
    });
  }
});

//Method: GET  ALL Products
const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await BookService.getproducts(req.query);

    res.send({
      status: true,
      message: 'Books retrieved successfully',
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      stack:
        process.env.NODE_ENV === 'development' ? (error as Error) : undefined,
      error,
    });
  }
};

//Method: GET   SINGLE

const getSingleBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const result = await BookService.getSingleBook(bookId);

    res.send({
      status: true,
      message: 'Books retrieved successfully',
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      stack:
        process.env.NODE_ENV === 'development' ? (error as Error) : undefined,
      error,
    });
  }
};

//Method: PUT

const UpdateBook = catchAsync(async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const body = req.body;
    const result = await BookService.UpdateBook(bookId, body);

    res.send({
      status: true,
      message: 'Book updated successfully',
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      stack:
        process.env.NODE_ENV === 'development' ? (error as Error) : undefined,
      error,
    });
  }
});

//Method: DELETE

const DeleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    await BookService.DeleteBook(bookId);

    res.send({
      status: true,
      message: 'Books deleted successfully',
      result: {},
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      stack:
        process.env.NODE_ENV === 'development' ? (error as Error) : undefined,
      error,
    });
  }
};

export const productController = {
  createBook,
  getProducts,
  getSingleBook,
  UpdateBook,
  DeleteBook,
};
