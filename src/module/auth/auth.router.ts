import { Router } from 'express';
import validateRequest from '../../middleweres/validateRequest';
import { UserValidation } from '../User/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import auth from '../../middleweres/auth';

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

//changesPassword

authRoute.post(
  '/change_password',
  auth('user'),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassWord,
);

// Example: Get User Info from Token
authRoute.get('/profile', auth('user'), (req, res) => {
  const user = req.user; // Assuming the token is verified and user data is stored
  res.json(user);
});

export default authRoute;
