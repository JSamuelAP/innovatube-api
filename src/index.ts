import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { env } from './config/env';
import authRouter from './routes/auth.routes';
import videosRouter from './routes/videos.routes';
import { globalErrorHandler } from './middlewares/errorHandler';
import { validateJWT } from './middlewares/auth.middleware';

const app = express();
const PORT = env.PORT;

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

// public routes
app.use('/api/v1/auth', authRouter);

// protected routes
app.use(validateJWT);
app.use('/api/v1/videos', videosRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
