import express from 'express';
import imageApi from './api/imageApi';

const router = express.Router();

router.use('/images', imageApi);

router.get('/', (req, res) => {
  res.send('Hello from router ... Please go to /api/images to use our API.');
});

export default router;
