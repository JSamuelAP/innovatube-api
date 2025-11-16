import type { CreateUserDTO, User } from '../types';

export class UserRepository {
  public async findByEmailOrUsername(username: string, email: string): Promise<User | null> {
    return {
      id: 1,
      name: 'a',
      lastName: 'a',
      username: username,
      email: email,
      passwordHash: '$2b$10$vVXEImW64nUoFOuJYyDKaOEBt4kz4UR/5Ro.2XLvexJspcXAF.x1G',
    };
  }

  public async create(user: CreateUserDTO): Promise<User | null> {
    return {
      id: 1,
      name: user.name,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      passwordHash: user.password,
    };
  }
}
