const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

import {
  getPhotos,
} from './Controllers/flickrController';

require('dotenv').config();
const origin = process.env.ORIGIN;

app.use(cors({ origin }));

app.get('/photos', getPhotos);

app.listen(port, () => {
  console.log(`Photo server listening on port ${port}`);
});

module.exports = app;
