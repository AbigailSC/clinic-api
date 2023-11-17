import { ObjectId } from 'mongoose';

export interface DocumentType {
  adminId: ObjectId;
  form: string;
  signed: boolean;
  signedAt?: Date;
  signedBy: ObjectId;
}
