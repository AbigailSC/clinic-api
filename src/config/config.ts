import dotenv from 'dotenv';

const env = dotenv.config();

if (env.error) {
  throw new Error('💥 Could not find .env files');
}

export const config = {
  app: {
    env: process.env.NODE_ENV ?? 'development',
    port: process.env.PORT ?? 4000,
    originUrl: process.env.ORIGIN_URL ?? 'http://localhost:4000/',
    verifyAccountUrl:
      process.env.VERIFY_ACCOUNT_URL ?? 'http://localhost:4000/verify',
    loginAccountUrl:
      process.env.LOGIN_ACCOUNT_URL ?? 'http://localhost:4000/login',
    signDocumentUrl:
      process.env.SIGN_DOCUMENT_URL ?? 'http://localhost:4000/my-documents'
  },
  s3: {
    secretKey: process.env.DO_SPACES_SECRET_KEY ?? '',
    accessKey: process.env.DO_SPACES_ACCESS_KEY ?? '',
    endpoint: process.env.DO_SPACES_ENDPOINT ?? '',
    region: process.env.DO_SPACES_REGION ?? '',
    bucketName: process.env.DO_SPACES_BUCKET_NAME ?? ''
  },
  db: {
    uri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/api',
    devUri: process.env.MONGODB_DEV_URI ?? 'mongodb://127.0.0.1:27017/',
    imageDefault: process.env.IMAGE_DEFAULT_USER ?? ''
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET ?? 'SECRET',
    jwtRefresh: process.env.JWT_REFRESH ?? 'REFRESH',
    jwtExpires: process.env.JWT_EXPIRES ?? '1h'
  },
  email: {
    user: process.env.EMAIL_USER ?? 'EMAIL_USER',
    pass: process.env.EMAIL_PASS ?? 'EMAIL_PASS'
  }
};
