import { ROLES } from '@constants';
import { PatientType } from '@interfaces';
import { catchAsync } from '@middlewares';
import { Patient, User } from '@models';
import { RequestHandler } from 'express';

export const postPatient: RequestHandler = catchAsync(async (req, res) => {
  const {
    name,
    lastname,
    address,
    birthdate,
    document,
    email,
    phone,
    socialWork
  }: PatientType = req.body;

  const patientExists = await Patient.findOne({ email });
  if (patientExists !== null)
    return res.status(400).json({
      status: res.statusCode,
      message: 'Patient already exists'
    });

  const newPatient = new Patient({
    name,
    lastname,
    address,
    birthdate,
    document,
    email,
    phone,
    socialWork
  });
  await newPatient.save();

  const newUser = new User({
    email,
    rol: ROLES.Patient
  });
  await newUser.save();
  return res.status(201).json({
    status: res.statusCode,
    message: 'Patient created'
  });
});
