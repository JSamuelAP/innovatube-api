export type User = {
  id: number;
  name: string;
  lastName: string;
  username: string;
  email: string;
  passwordHash: string;
};

export type ResponseUserDTO = Omit<User, 'passwordHash'>;

export type CreateUserDTO = Omit<User, 'id' | 'passwordHash'> & { password: string };

export type CredentialsUserDTO = Pick<User, 'username' | 'email'> & { password: string };
