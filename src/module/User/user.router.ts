import { Router } from 'express';
import { UserController } from './user.controller';
import auth from '../../middleweres/auth';

const userRouter = Router();

// userRouter.post('/create-user', UserController.creatUser);
userRouter.post('/', UserController.creatUser);
userRouter.put('/:userId', UserController.UpdateUser);
userRouter.delete('/:userId', auth('admin'), UserController.DeleteUser);
userRouter.get('/', auth('admin'), UserController.getUser);
userRouter.patch(
  '/:userId/deactivate',
  auth('admin'),
  UserController.deactivateUser,
); // Admin can deactivate users
export default userRouter;
