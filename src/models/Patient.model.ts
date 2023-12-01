import { PatientType } from '@interfaces';
import { Schema, model } from 'mongoose';

const PatientSchema = new Schema(
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
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    birthdate: {
      type: Date,
      required: true
    },
    socialWork: {
      type: Boolean,
      default: false
    },
    consents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'document'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

PatientSchema.methods.toJSON = function () {
  const { _v, _id, createdAt, updatedAt, ...patient } = this.toObject();
  return patient;
};

export default model<PatientType>('patient', PatientSchema);
