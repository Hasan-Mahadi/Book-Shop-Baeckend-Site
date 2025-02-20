import { Request, Response } from 'express';

import { userService } from './user.service';

import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Method:POST
const creatUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userService.createUser(payload);

  // res.json({
  // status: true,
  //  message: 'User created Successfully',
  //  data: result,
  //  })
  sendResponse(res, {
    message: 'User created Successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
    success: false,
  });
});

//put or update

const UpdateUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const body = req.body;
    const result = await userService.UpdateBook(bookId, body);

    // res.send({
    //   status: true,
    //   message: 'Book updated successfully',
    //   result,
    // });

    sendResponse(res, {
      message: 'Book updated successfully',
      statusCode: StatusCodes.CREATED,
      data: result,
      success: false,
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

const DeleteUser = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    await userService.DeleteBook(bookId);

    res.send({
      status: true,
      message: 'User deleted successfully',
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

// get user

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser();

    res.send({
      status: true,
      message: 'getting user Successfully',
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

//deactive-User

const deactivateUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deactivateUsers(req.params.userId);

    res.send({
      status: true,
      message: 'User deactivated successfully',
      result: { result },
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const UserController = {
  creatUser,
  getUser,
  UpdateUser,
  DeleteUser,
  deactivateUser,
};
