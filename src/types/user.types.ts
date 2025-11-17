export type User = {
  id: number;
  name: string;
  lastName: string;
  username: string;
  email: string;
  passwordHash: string;
};

export type ResponseUserDTO = Omit<User, 'passwordHash'> & { token?: string };

export type CreateUserDTO = Omit<User, 'id' | 'passwordHash' | 'lastName'> & { password: string; last_name: string };

export type CredentialsUserDTO = { identifier: string; password: string };
