import { NextFunction, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { config } from '@config';
import { CustomRequest } from '@interfaces';

export const verifyRefreshToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { refreshToken } = req.body;
  try {
    if (refreshToken === undefined) {
      return res.status(401).json({
        status: res.statusCode,
        message: 'Access denied, token not found'
      });
    }
    const payload = verify(refreshToken, config.auth.jwtSecret) as JwtPayload;
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
