/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

//register

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

//login

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AuthService.login(req.body);

      sendResponse(res, {
        success: true,
        message: 'Login successful',
        statusCode: StatusCodes.OK,
        token: result.token,
        data: result.verifiedUser,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials',
          statusCode: 401,
          error: error.message, // Send the error message instead of the entire error object
          stack: error.stack, // Access the stack safely
        });
      }
    }
  },
);

//logout
const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('token'); // Clear token from cookies if stored there

  sendResponse(res, {
    success: true,
    message: 'Logout successful',
    statusCode: StatusCodes.OK,
    data: null,
  });
  res.redirect('/login'); // Redirect to login page
});

export const AuthController = {
  register,
  login,
  logout,
};
