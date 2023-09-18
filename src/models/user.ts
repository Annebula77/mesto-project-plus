import mongoose from "mongoose";
import { IUser } from "../utils/types";
import validator from "validator";


const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    match: /^[a-zA-Z0-9.,!? ]*$/
  },

  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
    match: /^[a-zA-Z0-9.,!? ]*$/
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return validator.isURL(v);
      },
    }
  },
},
  { versionKey: false, }
)

export default mongoose.model<IUser>('user', UserSchema);