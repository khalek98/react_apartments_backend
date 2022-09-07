import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors;';

import { createApartPostValidation } from './validations/validations.js';
import { handleValidatonErrors } from './utils/index.js';
import * as ApartsController from './controllers/ApartsController.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB OK!'))
  .catch((err) => console.log('DB Error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>
  res.send('<h1>Data Base for Apartments App by Khalek</h1>'),
);
app.get('/aparts', ApartsController.getAllAparts);
app.post(
  '/aparts',
  createApartPostValidation,
  handleValidatonErrors,
  ApartsController.createApartPost,
);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.warn(err);
  }

  console.log(`Server OK!`);
});
