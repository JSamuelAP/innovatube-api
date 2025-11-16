import bcrypt from 'bcryptjs';

import type { CreateUserDTO, CredentialsUserDTO, ResponseUserDTO } from '../types';
import type { UserRepository } from '../repositories/user.repository';
import { AppError } from '../utils/AppError';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async signup(user: CreateUserDTO): Promise<ResponseUserDTO> {
    const existingUser = await this.userRepository.findByEmailOrUsername(user.username, user.email);
    if (existingUser) {
      const { email, username } = existingUser;
      if (email === user.email) throw new AppError(`Email '${email}' is already in use`, 409);
      if (username === user.username) throw new AppError(`Username '${username}' is already in use`, 409);
    }

    const passwordHash = await this.generatePasswordHash(user.password);
    const createdUser = await this.userRepository.create({ ...user, password: passwordHash });
    if (createdUser) {
      const { id, name, lastName, username, email } = createdUser;
      return {
        id,
        name,
        lastName,
        username,
        email,
      };
    } else {
      throw new AppError('An error occurred while registering the user', 500);
    }
  }

  // TODO: return jwt
  public async login(credentials: CredentialsUserDTO): Promise<ResponseUserDTO> {
    const existingUser = await this.userRepository.findByEmailOrUsername(credentials.username, credentials.email);
    if (!existingUser) {
      throw new AppError('Invalid email, username or password', 404);
    }

    if (await this.comparePasswords(credentials.password, existingUser.passwordHash)) {
      const { id, name, lastName, username, email } = existingUser;
      return {
        id,
        name,
        lastName,
        username,
        email,
      };
    } else {
      throw new AppError('Invalid email, username or password', 404);
    }
  }

  private async generatePasswordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private async comparePasswords(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
