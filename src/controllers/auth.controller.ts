import type { Request, Response } from 'express';

import type { CreateUserDTO } from '../types/user.types';

import { authService } from '../services';
import { formatSuccessResponse } from '../utils/appResponse';

const signup = async (req: Request, res: Response) => {
  const { name, lastName, username, email, password } = req.body;
  const user: CreateUserDTO = {
    name,
    lastName,
    username,
    email,
    password,
  };
  const createdUser = await authService.signup(user);
  res.status(201).json(formatSuccessResponse(201, 'User successfully registered', createdUser));
};

const login = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await authService.login({ username, email, password });
  res.status(200).json(formatSuccessResponse(200, 'User logged successfully', user));
};

export default { signup, login };
