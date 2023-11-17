import { ROLES } from '@constants';
import { AdminType, CustomRequest } from '@interfaces';
import { catchAsync } from '@middlewares';
import { Admin, User } from '@models';
import { RequestHandler } from 'express';

export const postAdmin: RequestHandler = catchAsync(async (req, res) => {
  const {
    name,
    lastname,
    address,
    document,
    email,
    phone
  }: AdminType = req.body;

  const adminExists = await Admin.findOne({ email });
  if (adminExists !== null)
    return res.status(400).json({
      status: res.statusCode,
      message: 'Administrator already exists'
    });

  const newAdmin = new Admin({
    name,
    lastname,
    address,
    document,
    email,
    phone
  });
  await newAdmin.save();

  const newUser = new User({
    email,
    rol: ROLES.Admin
  });
  await newUser.save();
  return res.status(201).json({
    status: res.statusCode,
    message: 'Administrator created'
  });
});

export const updateAdmin: RequestHandler = catchAsync(async (req: CustomRequest, res) => {
  const { id } = req
  const {
    name,
    lastname,
    address,
    document,
    phone,
  }: AdminType = req.body;

  const adminExists = await Admin.findOne({ id });
  if (adminExists !== null)
    return res.status(400).json({
      status: res.statusCode,
      message: 'Administrator already exists'
    });

  await Admin.findByIdAndUpdate(id, {
    name,
    lastname,
    address,
    document,
    phone
  })

  return res.status(201).json({
    status: res.statusCode,
    message: 'Administrator update!'
  })
});

export const getAdmins: RequestHandler = catchAsync(async (_req, res) => {
  const admins = await User.find({
    isActive: true,
    rol: ROLES.Admin
  }).populate('adminId');
  if (admins.length === 0){
    return res.status(204).json({
      status: res.statusCode,
      message: 'No content'
    })
  }
  return res.json({
    status: res.statusCode,
    data: admins
  })
});

export const getAdmin: RequestHandler = catchAsync(async (req: CustomRequest, res) => {
  const { id } = req;
  const adminExists = await Admin.findById(id);
  if (adminExists === null) {
    return res.status(204).json({
      status: res.statusCode,
      message: 'Administrator not found'
    })
  }
  return res.json({
    status: res.statusCode,
    data: adminExists
  })
});

export const deleteAdmin: RequestHandler = catchAsync(async (req: CustomRequest, res) => {
  const {id} = req;
  const adminExists = await Admin.findById(id);
  if (adminExists === null) {
    return res.status(204).json({
      status: res.statusCode,
      message: 'Administrator not found'
    })
  }
  await User.findByIdAndUpdate(id, {
    isActive: false
  })
  return res.json({
    status: res.statusCode,
    message: 'Administrator deleted!'
  })
});