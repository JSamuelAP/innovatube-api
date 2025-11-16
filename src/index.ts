import express from 'express';
import morgan from 'morgan';

import { env } from './config/env';

const app = express();
const PORT = env.PORT;

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/ping', (_req, res) => {
  console.log('pong');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
