import { NextFunction, Request, RequestHandler, Response } from 'express';

import { config, decodedToken } from '@config';
import { CustomRequest, DecodedToken, UserType } from '@interfaces';
import { User } from '@models';
import {
  messageEmailAlreadyActivated,
  messageEmailAlreadyVerified
} from '@utils';
import { JwtPayload, verify } from 'jsonwebtoken';

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const token = req.headers.authorization as string;
  if (!token) {
    return res.status(401).json({
      status: res.statusCode,
      message: 'No token provided'
    });
  }
  try {
    const payload = verify(token, config.auth.jwtSecret) as JwtPayload;
    const user: UserType | null = await User.findById(payload.id);
    if (!user) {
      return res.status(401).json({
        status: res.statusCode,
        message: 'User not found'
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: res.statusCode,
      message: 'Error validating token'
    });
  }
};

export const verifyUserIsActivated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const token = req.headers.authorization as string;
  try {
    const decoded = await decodedToken(token);
    const user = await User.findById(decoded.id);
    if (user!.isActive) {
      return res.status(401).json({
        status: res.statusCode,
        message: messageEmailAlreadyActivated()
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: res.statusCode,
      message: 'Access denied, you re not Logged In'
    });
  }
};

export const verifyUserVerified = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const token = req.headers['email-verification-token'] as string;
  try {
    const decoded: DecodedToken = await decodedToken(token);
    const user = await User.findById(decoded.id);
    if (user!.verified) {
      return res.status(401).json({
        status: res.statusCode,
        message: messageEmailAlreadyVerified()
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: res.statusCode,
      message: 'Access denied, you re not Logged In'
    });
  }
};

export const verifyRoles: (roles: string[]) => RequestHandler =
  (roles) => async (req, res, next) => {
    const token = req.headers.authorization as string;
    try {
      const decoded = await decodedToken(token);

      const user = await User.findById(decoded.id);

      if (!roles.includes(user!.rol))
        return res.status(401).json({
          status: res.statusCode,
          message: 'Unauthorized'
        });
      next();
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ status: res.statusCode, message: 'Access denied' });
    }
  };
