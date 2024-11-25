// req and res manages
import { Request, Response } from 'express';
import { BookService } from './product.service';

//Method: POST
const createBook = async (req: Request, res: Response) => {
  try {
    const bookload = req.body;

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
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      error,
    });
  }
};

//Method: GET  ALL
const getBook = async (req: Request, res: Response) => {
  try {
    const result = await BookService.getBook();

    res.send({
      status: true,
      message: 'Books retrieved successfully',
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
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
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      error,
    });
  }
};

//Method: PUT

const UpdateBook = async (req: Request, res: Response) => {
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
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      error,
    });
  }
};

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
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      error,
    });
  }
};

export const productController = {
  createBook,
  getBook,
  getSingleBook,
  UpdateBook,
  DeleteBook,
};
