import { ObjectId } from 'mongoose';

export interface DocumentType {
  _id: ObjectId;
  adminId: ObjectId;
  form: string;
  signed: boolean;
  signedAt?: Date;
  signedBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
