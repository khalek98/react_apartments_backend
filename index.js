import express from 'express';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';

import { createApartPostValidation } from './validations/validations.js';
import { handleValidatonErrors } from './utils/index.js';
import * as ApartsController from './controllers/ApartsController.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB OK!'))
  .catch((err) => console.log('DB Error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).array('multiple_images', 10);

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

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
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    // console.log(req.files);
    let imgArr = [];
    const files = req.files;
    let index, len;

    for (index = 0, len = files.length; index < len; ++index) {
      imgArr.push(`/uploads/${files[index].originalname}`);
    }

    res.send({
      imgArr,
    });
  });
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.warn(err);
  }

  console.log(`Server OK!`);
});
