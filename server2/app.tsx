import { Request, Response, Next } from 'express';
import {
  getPhotos,
  getPhotosFromSet,
  getSetList,
} from './Controllers/flickrController';
import { envCheck } from './Middleware/envCheck';

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

require('dotenv').config();

app.use(envCheck);

const origin = process.env.ORIGIN;
app.use(cors({ origin }));

app.get('/photos', (req: Request, res: Response) => {
  if (req.query.setId) {
    return getPhotosFromSet(req, res);
  }
  return getPhotos(req, res);
});

app.get('/sets', (req: Request, res: Response) => {
  return getSetList(req, res);
});

app.listen(port, () => {
  console.log(`Photo server listening on port ${port}`);
});

module.exports = app;
