import { ObjectId } from 'mongoose';
import { AdminType } from './admin.interface';

export interface PatientType extends AdminType {
  birthdate: Date;
  socialWork: boolean;
  consents: ObjectId[];
}
