import type { Request, Response } from 'express';

import type { CreateUserDTO } from '../types/user.types';

import { authService, recaptchaService } from '../services';
import { formatSuccessResponse } from '../utils/appResponse';
import { AppError } from '../utils/AppError';

const signup = async (req: Request, res: Response) => {
  const { name, lastName, username, email, password, recaptchaToken } = req.body;

  const isCaptchaValid = await recaptchaService.validateCaptcha(recaptchaToken);
  if (!isCaptchaValid) {
    throw new AppError('Invalid captcha', 400);
  }

  const user: CreateUserDTO = {
    name,
    last_name: lastName,
    username,
    email,
    password,
  };
  const createdUser = await authService.signup(user);
  res.status(201).json(formatSuccessResponse(201, 'User successfully registered', createdUser));
};

const login = async (req: Request, res: Response) => {
  const { identifier, password } = req.body;
  const user = await authService.login({ identifier, password });
  res.status(200).json(formatSuccessResponse(200, 'User logged successfully', user));
};

export default { signup, login };
