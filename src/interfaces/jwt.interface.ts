import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface CredentialsRefreshToken {
  httpOnly: boolean;
  maxAge: number;
  secure: boolean;
  expires: Date;
  sameSite: boolean | "strict" | "lax" | "none" | undefined;
  singed: boolean
}

export interface CustomRequest extends Request {
  id?: string;
}

export interface DecodedToken extends JwtPayload {
  id: string;
  iat: number;
  exp: number;
}
