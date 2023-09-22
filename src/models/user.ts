import mongoose from 'mongoose';
import { emailValidationOptions, urlValidationOptions } from '../utils/validators';
import { IUser } from '../utils/types';
import { DEFAULT_ABOUT_VALUE, DEFAULT_AVATAR_LINK, DEFAULT_USER_NAME } from '../utils/consts';

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: DEFAULT_USER_NAME,
    },

    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      default: DEFAULT_ABOUT_VALUE,
    },
    avatar: {
      type: String,
      validate: urlValidationOptions,
      default: DEFAULT_AVATAR_LINK,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: emailValidationOptions,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

export default mongoose.model<IUser>('user', UserSchema);
