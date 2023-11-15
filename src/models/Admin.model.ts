import { AdminType } from '@interfaces';
import { Schema, model } from 'mongoose';

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    document: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

AdminSchema.methods.toJSON = function () {
  const { _v, _id, createdAt, updatedAt, ...admin } = this.toObject();
  return admin;
};

export default model<AdminType>('admin', AdminSchema);
