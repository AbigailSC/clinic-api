import { recolectErrors } from '@middlewares';
import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';

export const verifyLoginParams = [
  check('email', 'Email is required').exists().not().isEmpty(),
  check('email').isEmail().withMessage('Email format invalid'),
  check('email').normalizeEmail().escape(),
  check('password', 'Password is required').not().isEmpty(),
  check(
    'password',
    'Password should have at least 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 symbol'
  ).isStrongPassword(),
  (req: Request, res: Response, next: NextFunction) => {
    recolectErrors(req, res, next);
  }
];

export const verifyPatientParams = [
  check('name', 'Name is required').not().isEmpty(),
  check('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
  check('name', 'Name is not a string').isString(),
  check('lastname', 'Lastname is required').not().isEmpty(),
  check('lastname', 'Lastname must be at least 3 characters').isLength({
    min: 3
  }),
  check('lastname', 'Lastname is not a string').isString(),
  check('document', 'Document is required').not().isEmpty(),
  check('document', 'Document is not a number').isNumeric(),
  check('document', 'Document should have at 7 or 8 digits').isLength({
    min: 7,
    max: 8
  }),
  check('email', 'Email is required').exists().not().isEmpty(),
  check('email').isEmail().withMessage('Email format invalid'),
  check('email').normalizeEmail().escape(),
  check('phone', 'Number phone is required').not().isEmpty(),
  check('phone', 'Number phone is not a number').isNumeric(),
  check('phone', 'Number phone must be at least 7 characters').isLength({
    min: 7
  }),
  check('address', 'Address is required').not().isEmpty(),
  check('address', 'Address must be at least 7 characters').isLength({
    min: 7
  }),
  check('address', 'Address is not a string').isString(),
  check('birthdate', 'Birthdate is required').not().isEmpty(),
  check('birthdate', 'Birthdate is not a Date').isDate(),
  check('socialWork', 'Social work is required'),
  check('socialWork', 'Social work is not a boolean').isBoolean(),
  (req: Request, res: Response, next: NextFunction) => {
    recolectErrors(req, res, next);
  }
];

export const verifyAdminParams = [
  check('name', 'Name is required').not().isEmpty(),
  check('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
  check('name', 'Name is not a string').isString(),
  check('lastname', 'Lastname is required').not().isEmpty(),
  check('lastname', 'Lastname must be at least 3 characters').isLength({
    min: 3
  }),
  check('lastname', 'Lastname is not a string').isString(),
  check('document', 'Document is required').not().isEmpty(),
  check('document', 'Document is not a number').isNumeric(),
  check('document', 'Document should have at 7 or 8 digits').isLength({
    min: 7,
    max: 8
  }),
  check('email', 'Email is required').exists().not().isEmpty(),
  check('email').isEmail().withMessage('Email format invalid'),
  check('email').normalizeEmail().escape(),
  check('phone', 'Number phone is required').not().isEmpty(),
  check('phone', 'Number phone is not a number').isNumeric(),
  check('phone', 'Number phone must be at least 7 characters').isLength({
    min: 7
  }),
  check('address', 'Address is required').not().isEmpty(),
  check('address', 'Address must be at least 7 characters').isLength({
    min: 7
  }),
  check('address', 'Address is not a string').isString(),
  (req: Request, res: Response, next: NextFunction) => {
    recolectErrors(req, res, next);
  }
];
