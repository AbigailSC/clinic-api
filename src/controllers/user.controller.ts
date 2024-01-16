import { RequestHandler } from 'express';
import { User } from '@models';
import { catchAsync } from '@middlewares';
import { CustomRequest, UserType } from '@interfaces';

export const getUsers: RequestHandler = catchAsync(async (_req, res) => {
  const allUsers = await User.find({ isActive: true });
  if (allUsers.length === 0) res.json({ message: 'No users found' });
  res.json({
    status: res.statusCode,
    message: 'Users found',
    data: allUsers
  });
});

export const getUserById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user === null) {
    return res.json({ status: res.statusCode, message: 'User not found!' });
  }
  res.json({
    status: res.statusCode,
    message: 'User found',
    data: user
  });
});

export const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data: UserType = req.body;
  const updateUser = await User.findById(id);
  if (updateUser === null)
    return res.status(500).json({
      status: res.statusCode,
      message: 'User not found'
    });
  await User.findByIdAndUpdate(id, data);
  res.json({
    status: res.statusCode,
    message: 'User updated'
  });
});

export const deleteUser: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deleteUser = await User.findByIdAndUpdate(id, {
    isActive: false
  });
  if (deleteUser === null)
    res.json({
      status: res.statusCode,
      message: 'User not found'
    });
  res.json({
    status: res.statusCode,
    message: 'User deleted'
  });
});

export const restoreUser: RequestHandler = catchAsync(
  async (req: CustomRequest, res) => {
    const { id } = req;
    const restoreUser = await User.findByIdAndUpdate(id, {
      isActive: true
    });
    if (restoreUser === null)
      res.json({
        status: res.statusCode,
        message: 'User not found'
      });
    res.json({
      status: res.statusCode,
      message: 'User restored'
    });
  }
);

export const uploadImage: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const filename = req.file as Express.MulterS3.File;
  const user = await User.findById(id);
  if (user === null) {
    return res.status(204).json({
      status: res.status,
      message: 'No user found'
    });
  }
  if (filename === undefined) {
    return res.status(204).json({
      status: res.status,
      message: 'You must attachment a image'
    });
  }
  await User.findByIdAndUpdate(id, {
    image: filename.location
  });
  res.status(201).json({
    message: 'File upload succesfully!'
  });
});
