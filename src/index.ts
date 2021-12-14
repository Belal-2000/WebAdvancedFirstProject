import express from 'express';
import router from './routes/index';

const app = express();
app.use('/api', router);
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from root ... Please go to /api/images to use our API.');
});

app.listen(port, () => {
  console.log('App running at port ' + port);
});

export default app;
