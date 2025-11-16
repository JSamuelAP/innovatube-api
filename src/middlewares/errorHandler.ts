import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/AppError';
import { formatErrorResponse } from '../utils/appResponse';

export const globalErrorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  if (statusCode === 500) {
    console.error('UNEXPECTED ERROR: ', error);
  }

  res.status(statusCode).json(formatErrorResponse(statusCode, message));
};
