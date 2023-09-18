import { ObjectId } from "mongoose";

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

export interface ICard {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createdAt: Date;
}

export type UserData = { name: string, about: string } | { avatar: string };

export interface UpdateUserData {
  name?: string;
  about?: string;
  avatar?: string;
}
