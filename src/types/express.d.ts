import type { ResponseUserDTO } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: ResponseUserDTO;
    }
  }
}
