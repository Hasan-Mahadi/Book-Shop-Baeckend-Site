import { Router } from 'express';
import { UserController } from './user.controller';
import auth from '../../middleweres/auth';

const userRouter = Router();

// userRouter.post('/create-user', UserController.creatUser);
userRouter.post('/admin', UserController.creatUser);
userRouter.put('/:bookId', UserController.UpdateUser);
userRouter.delete('/:bookId', UserController.DeleteUser);

// userRouter.get('/',auth("admin", "user"), UserController.getUser);
userRouter.get('/', auth('admin'), UserController.getUser);
export default userRouter;
