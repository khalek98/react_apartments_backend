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
