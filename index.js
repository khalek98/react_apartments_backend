import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import { createApartPostValidation } from './validations/validations.js';
import { handleValidatonErrors } from './utils/index.js';
import * as ApartsController from './controllers/ApartsController.js';

const PORT = 4000;

mongoose
  .connect(
    'mongodb+srv://admin:17supusaH@cluster0.ufyxye3.mongodb.net/apartments?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB OK!'))
  .catch((err) => console.log('DB Error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.post(
  '/aparts',
  createApartPostValidation,
  handleValidatonErrors,
  ApartsController.createApartPost,
);
app.get('/aparts', ApartsController.getAllAparts);
app.get('/', (req, res) =>
  res.send('<h1>Data Base for Apartments App by Khalek</h1>'),
);

app.listen(process.env.PORT || PORT, (err) => {
  if (err) {
    return console.warn(err);
  }

  console.log(`Server has been started http://localhost:${PORT}/...`);
});
