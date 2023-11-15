import mongoose from 'mongoose';
import { config } from './config';

export const dbConnection = async (): Promise<void> => {
  try {
    const dbURL = config.db.uri;
    if (!dbURL) {
      throw new Error('MongoDB URL not defined');
    }
    await mongoose.connect(dbURL);
    console.log('✔️ ...Database connected!');
  } catch (error) {
    console.log(error);
    throw new Error('❌ ...Database connection failed!');
  }
};
