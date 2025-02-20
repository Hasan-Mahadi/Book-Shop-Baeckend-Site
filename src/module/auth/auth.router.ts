import { Router } from 'express';
import validateRequest from '../../middleweres/validateRequest';
import { UserValidation } from '../User/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
// import { AuthController } from './auth.controller';
// import validateRequest from '../../middlewares/validateRequest';
// import { UserValidation } from '../User/user.validation';
// import { AuthValidation } from './auth.validation';
//
const authRoute = Router();

authRoute.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  AuthController.register,
);
//
//

authRoute.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login,
);

authRoute.post('/logout', AuthController.logout);

export default authRoute;
