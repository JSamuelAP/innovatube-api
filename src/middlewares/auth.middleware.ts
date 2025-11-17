import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/AppError';
import { verifyToken } from '../utils/jwt';
import { userRepository } from '../repositories';

export const validateJWT = async (req: Request, _res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('No token provided in request', 401));
  }

  try {
    const decoded = verifyToken(token);
    const currentUser = await userRepository.findById(decoded.id);

    if (!currentUser) {
      return next(new AppError('The user of this token does not exist', 401));
    }

    const { id, name, lastName, username, email } = currentUser;
    req.user = { id, name, lastName, username, email };

    next();
  } catch (error) {
    return next(new AppError('Invalid or expired token', 401));
  }
};
