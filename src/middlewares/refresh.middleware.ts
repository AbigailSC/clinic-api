import { NextFunction, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { config } from '@config';
import { CustomRequest } from '@interfaces';

export const verifyRefreshToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const cookie = req.cookies.refreshToken;
  try {
    if (cookie === undefined) {
      return res.status(401).json({
        status: res.statusCode,
        message: 'Access denied, cookie not found'
      });
    }
    const payload = verify(cookie, config.auth.jwtSecret) as JwtPayload;
    req.id = payload.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: res.statusCode,
      message: 'Access denied, you re not Logged In'
    });
  }
};
