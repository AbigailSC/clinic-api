import { DocumentType } from '@interfaces';
import { Schema, model } from 'mongoose';

const DocumentSchema = new Schema(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    form: {
      type: String,
      required: true
    },
    signed: {
      type: Boolean,
      default: false
    },
    signedAt: {
      type: Date,
      required: false
    },
    signedBy: {
      type: Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

DocumentSchema.methods.toJSON = function () {
  const { _v, _id, createdAt, updatedAt, ...document } = this.toObject();
  return document;
};

export default model<DocumentType>('document', DocumentSchema);
