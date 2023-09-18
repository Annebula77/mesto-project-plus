import mongoose from "mongoose";
import { ICard } from "../utils/types";
import validator from "validator";



const CardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    match: /^[a-zA-Z0-9.,!? ]*$/
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return validator.isURL(v);
      }
    }
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
},
  { versionKey: false, }
)

export default mongoose.model<ICard>('card', CardSchema);