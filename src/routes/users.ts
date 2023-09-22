import { Router } from 'express';
import {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getAuthUser,
} from '../controllers/users';
import AuthorizedUser from '../middlewares/auth';
import { avatarValidator, userIdValidator, profileValidator } from '../utils/validators';

const userRouter = Router();

userRouter.get('/', AuthorizedUser, getUsers);

userRouter.get('/:userId', userIdValidator, getUserById);
userRouter.get('/me', AuthorizedUser, getAuthUser);

userRouter.patch('/me', profileValidator, AuthorizedUser, updateUserInfo);
userRouter.patch('/me/avatar', avatarValidator, AuthorizedUser, updateUserAvatar);

export default userRouter;
