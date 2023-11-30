import { ROLES } from '@constants';
import { PatientType } from '@interfaces';
import { catchAsync } from '@middlewares';
import { Patient, User } from '@models';
import { sendEmailVerification } from '@utils';
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
  await sendEmailVerification(email);
  return res.status(201).json({
    status: res.statusCode,
    message: 'Patient created'
  });
});

export const updatePatient: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const {
    name,
    lastname,
    address,
    birthdate,
    document,
    phone,
    socialWork
  }: PatientType = req.body;

  const patientExists = await Patient.findOne({ id });
  if (patientExists !== null)
    return res.status(400).json({
      status: res.statusCode,
      message: 'Patient already exists'
    });

  await Patient.findByIdAndUpdate(id, {
    name,
    lastname,
    address,
    birthdate,
    document,
    phone,
    socialWork
  })

  return res.status(201).json({
    status: res.statusCode,
    message: 'Patient update!'
  })
});

export const getPatients: RequestHandler = catchAsync(async (_req, res) => {
  const patients = await User.find({
    isActive: true,
    rol: ROLES.Patient
  }).populate('patientId');
  if (patients.length === 0){
    return res.status(204).json({
      status: res.statusCode,
      message: 'No content'
    })
  }
  return res.json({
    status: res.statusCode,
    data: patients
  })
});

export const getPatient: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const patientExist = await Patient.findById(id);
  if (patientExist === null) {
    return res.status(204).json({
      status: res.statusCode,
      message: 'Patient not found'
    })
  }
  return res.json({
    status: res.statusCode,
    data: patientExist.populate('consents')
  })
});

export const deletePatient: RequestHandler = catchAsync(async (req, res) => {
  const {id} = req.params;
  const patientExist = await Patient.findById(id);
  if (patientExist === null) {
    return res.status(204).json({
      status: res.statusCode,
      message: 'Patient not found'
    })
  }
  await User.findByIdAndUpdate(id, {
    isActive: false
  })
  return res.json({
    status: res.statusCode,
    message: 'Patient deleted!'
  })
});