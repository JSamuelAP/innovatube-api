import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const generateToken = (payload: { id: number }) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as { id: number; iat: number; exp: number };
};
