import mongoose, { ObjectId } from "mongoose";
import User from "../models/user";
import { UserData, UpdateUserData } from "utils/types";
import { NextFunction, Request, Response } from "express";
import {
  STATUS_SUCCESS,
  STATUS_BAD_REQUEST,
  VALIDATION_ERROR_MESSAGE
} from "../utils/consts";

const updateUser = async (id: string | ObjectId, data: UpdateUserData) => {
  return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export const userUpdateDecorator = (dataExtractor: (req: Request) => UserData) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = dataExtractor(req);
      const { id } = req.params

      const updatedUser = await updateUser(id, data);
      res.status(STATUS_SUCCESS).send(updatedUser);

    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res
          .status(STATUS_BAD_REQUEST)
          .send({ ...error, message: VALIDATION_ERROR_MESSAGE });
      }
      next(error);
    }
  };
};