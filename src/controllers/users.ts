import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/user";
import {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_BAD_REQUEST,
  USERS_NOT_FOUND_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_DATA_MESSAGE,
  VALIDATION_ERROR_MESSAGE
} from "../utils/consts";
import { NotFoundError } from "../errors/notfoundError";



export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      res.status(STATUS_SERVER_ERROR).send({ message: USERS_NOT_FOUND_MESSAGE })
      return;
    }
    res.status(STATUS_SUCCESS).send(users)
  }
  catch (error) {
    next(error);
  }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).orFail(() => new NotFoundError(USER_NOT_FOUND_MESSAGE));
    res.status(STATUS_SUCCESS).send(user);
  }
  catch (error) {
    if (error instanceof Error && error.name === "NotFoundError") {
      return res.status(STATUS_NOT_FOUND).send({ message: STATUS_NOT_FOUND });
    }
    if (error instanceof mongoose.Error.CastError) {
      return res.status(STATUS_BAD_REQUEST).send({ message: INVALID_DATA_MESSAGE });
    }
    next(error);
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    return res.status(STATUS_CREATED).send(newUser);
  }
  catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ ...error, message: VALIDATION_ERROR_MESSAGE });
    }
    next(error);
  }
}


export const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about } = req.body;
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true });

    if (!updatedUser) {
      throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    }

    res.status(STATUS_SUCCESS).send(updatedUser);
  }
  catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ ...error, message: VALIDATION_ERROR_MESSAGE });
    }
    next(error);
  }
}

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { avatar } = req.body;
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true });

    if (!updatedUser) {
      throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    }

    res.status(STATUS_SUCCESS).send(updatedUser);
  }
  catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ ...error, message: VALIDATION_ERROR_MESSAGE });
    }
    next(error);
  }
}







