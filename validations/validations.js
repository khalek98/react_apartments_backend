import { body } from 'express-validator';

export const createApartPostValidation = [
  body('title', 'Entered title must be at least 5 characters long')
    .isLength({ min: 5 })
    .isString(),
  body('description', 'Entered description must be at least 10 characters long')
    .isLength({ min: 10 })
    .isString(),
  body('price', 'The value must be a  number').isNumeric({ no_symbols: true }),
  body('imgArr', 'This field must contain a string array').isArray(),
  body('location', 'Wrong!').isObject(),
];

export const registerValidation = [
  body('email', 'Wrong form email').isEmail(),
  body('firstName', 'Firstname must be at least 2 characters long').isLength({
    min: 2,
  }),
  body('lastName', 'Last name must be at least 2 characters long').isLength({
    min: 2,
  }),
  body(
    'password',
    'Password length must be at least 8 characters long',
  ).isLength({ min: 8 }),
];

export const loginValidation = [
  body('email', 'Wrong form email').isEmail(),
  body(
    'password',
    'Password length must be at least 8 characters long',
  ).isLength({ min: 8 }),
];

export const editUserValidation = [
  body('email', 'Wrong form email').isEmail(),
  body('firstName', 'Firstname must be at least 2 characters long').isLength({
    min: 2,
  }),
  body('lastName', 'Last name must be at least 2 characters long').isLength({
    min: 2,
  }),
  body('password', 'Password length must be at least 8 characters long')
    .optional()
    .isLength({ min: 8 }),
];
