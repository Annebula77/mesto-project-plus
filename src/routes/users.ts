import { Router } from 'express';
import {
  getUsers, getUserById, updateUserInfo, updateUserAvatar,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatar);

export default userRouter;
