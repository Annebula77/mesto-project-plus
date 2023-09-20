import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  STATUS_BAD_REQUEST,
  USER_NOT_FOUND_MESSAGE,
  INVALID_DATA_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  WRONG_EMAIL_PASSWORD_MESSAGE,
} from '../utils/consts';
import NotFoundError from '../errors/notfoundError';
import userUpdateDecorator from '../decorators/userDecorator';
import UnauthorizedError from '../errors/unauthorizedError';

export const jwtSecret = process.env.JWT_SECRET as string;

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    return res.status(STATUS_SUCCESS).send(users);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).orFail(() => new NotFoundError(USER_NOT_FOUND_MESSAGE));
    return res.status(STATUS_SUCCESS).send(user);
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFoundError') {
      return res.status(STATUS_NOT_FOUND).send({ message: STATUS_NOT_FOUND });
    }
    if (error instanceof mongoose.Error.CastError) {
      return res.status(STATUS_BAD_REQUEST).send({ message: INVALID_DATA_MESSAGE });
    }
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name, about, avatar, email, password: hash,
    });

    return res.status(STATUS_CREATED).send(newUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ ...error, message: VALIDATION_ERROR_MESSAGE });
    }
    return next(error);
  }
};

export const updateUserInfo = userUpdateDecorator((req: Request) => {
  const { name, about } = req.body;
  return { name, about };
});

export const updateUserAvatar = userUpdateDecorator((req: Request) => {
  const { avatar } = req.body;
  return { avatar };
});

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      throw new UnauthorizedError(WRONG_EMAIL_PASSWORD_MESSAGE);
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      throw new UnauthorizedError(WRONG_EMAIL_PASSWORD_MESSAGE);
    }
    const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' });
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true, // если используется HTTPS
      sameSite: 'strict',
    });
    res.send({ token });
  } catch (err) {
    next(err);
  }
};
