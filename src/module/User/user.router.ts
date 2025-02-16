import { Router } from 'express';
import { UserController } from './user.controller';

const userRouter = Router();

// userRouter.post('/create-user', UserController.creatUser);
userRouter.post('/', UserController.creatUser);
userRouter.put('/:bookId', UserController.UpdateUser);
userRouter.delete('/:bookId', UserController.DeleteUser);
userRouter.get('/', UserController.getUser);

export default userRouter;
