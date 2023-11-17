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
    const { password }: UserType = req.body;
    const updateUser = await User.findById(id);
    if (updateUser === null)
      return res.status(500).json({
        status: res.statusCode,
        message: 'User not found'
      });
    const encryptedPassword = await updateUser.encryptPassword(password);
    await User.findByIdAndUpdate(id, {
      password: encryptedPassword,
      verified: true
    });
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
    res.status(201).json({
      message: 'File upload succesfully!',
      file: req.file as Express.Multer.File
    })
  });