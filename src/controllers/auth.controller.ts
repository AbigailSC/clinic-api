import { generateToken, getCredentialsRefreshToken } from '@config';
import { CustomRequest } from '@interfaces';
import { catchAsync } from '@middlewares';
import { User } from '@models';
import { messageEmailDesactivated, messageEmailNotFound } from '@utils';
import { RequestHandler } from 'express';

export const singIn: RequestHandler = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (userFound === null) {
    return res.status(404).json({
      status: res.statusCode,
      message: messageEmailNotFound(email)
    });
  }
  const matchPassword = await userFound.comparePassword(password);
  if (!matchPassword) {
    return res
      .status(401)
      .json({ status: res.statusCode, message: 'Invalid password' });
  }
  res.cookie(
    'refreshToken',
    await generateToken(userFound.id),
    getCredentialsRefreshToken()
  );
  return res.json({
    status: res.statusCode,
    message: 'Log in successfully'
  });
});

export const refreshToken: RequestHandler = catchAsync(
  async (req: CustomRequest, res) => {
    const { id } = req;
    if (id === undefined) throw new Error('No id provided');
    const token = await generateToken(id);
    return res.json({ token });
  }
);

export const activateAccount: RequestHandler = catchAsync(async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  const userFound = await User.findById(id);
  if (!userFound) return res.status(404).json({ message: 'User not found' });
  const encryptPassword = await userFound.encryptPassword(password);

  await User.findByIdAndUpdate(id, {
    verified: true,
    password: encryptPassword
  });
  res.json({
    status: res.statusCode,
    message: 'Account activated successfully'
  });
});

export const deleteAccount: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, {
    isActive: false
  });
  res.json({
    status: res.statusCode,
    message: messageEmailDesactivated()
  });
});

export const logOut: RequestHandler = catchAsync(async (_req, res) => {
  res.clearCookie('refreshToken');
  res.json({
    status: res.statusCode,
    message: 'Log out successfully'
  });
});
