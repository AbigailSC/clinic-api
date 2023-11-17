import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from '@interfaces';
import { ROLES } from '@constants';
import { config } from '@config';

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: false,
      default: config.db.imageDefault
    },
    rol: {
      type: String,
      required: false,
      default: ROLES.Patient
    },
    verified: {
      type: Boolean,
      required: true,
      default: false
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

UsersSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UsersSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UsersSchema.methods.toJSON = function () {
  const {
    _v,
    password,
    _id,
    createdAt,
    updatedAt,
    ...user
  } = this.toObject();
  return user;
};

export default model<UserType>('user', UsersSchema);
