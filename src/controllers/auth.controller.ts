import { generateToken, getCredentialsRefreshToken } from '@config';
import { CustomRequest, PatientType, UserType } from '@interfaces';
import { catchAsync } from '@middlewares';
import { Patient, User } from '@models';
import {
  messageEmailDesactivated,
  messageEmailNotFound,
  sendEmailWelcome
} from '@utils';
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
  const token = await generateToken(userFound.id);
  console.log(
    '🚀 ~ file: auth.controller.ts:28 ~ constsingIn:RequestHandler=catchAsync ~ token:',
    token
  );

  res.cookie('refreshToken', token, getCredentialsRefreshToken());

  //res.set('refreshToken', await generateToken(userFound.id));
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
  const userFound: UserType | null = await User.findById(id);
  if (!userFound)
    return res
      .status(404)
      .json({ status: res.status, message: 'User not found' });
  const encryptPassword = await userFound.encryptPassword(password);

  await User.findByIdAndUpdate(id, {
    verified: true,
    password: encryptPassword
  });

  const patientFound: PatientType | null = await Patient.findOne({
    email: userFound.email
  });
  if (!patientFound)
    return res
      .status(404)
      .json({ status: res.status, message: 'Patient not found' });
  await sendEmailWelcome(userFound.email, patientFound.name);
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
