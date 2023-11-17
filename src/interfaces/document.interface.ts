import { ObjectId } from "mongoose";

export interface Document {
  adminId: ObjectId;
  form: string;  
}