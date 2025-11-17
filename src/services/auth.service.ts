import bcrypt from 'bcryptjs';

import type { CreateUserDTO, CredentialsUserDTO, ResponseUserDTO } from '../types';
import type { UserRepository } from '../repositories/user.repository';
import { AppError } from '../utils/AppError';
import { generateToken } from '../utils/jwt';

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
    if (!createdUser) {
      throw new AppError('An error occurred while registering the user', 500);
    }

    const { id, name, lastName, username, email } = createdUser;
    return {
      id,
      name,
      lastName,
      username,
      email,
    };
  }

  // TODO: return jwt
  public async login(credentials: CredentialsUserDTO): Promise<ResponseUserDTO> {
    const existingUser = await this.userRepository.findByLoginIdentifier(credentials.identifier);
    if (!existingUser || !(await this.comparePasswords(credentials.password, existingUser.passwordHash))) {
      throw new AppError('Invalid email, username or password', 404);
    }

    const token = generateToken({ id: existingUser.id });

    const { id, name, lastName, username, email } = existingUser;
    return {
      id,
      name,
      lastName,
      username,
      email,
      token,
    };
  }

  private async generatePasswordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private async comparePasswords(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
