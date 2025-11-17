import type { User } from './user.types';

export type SupabaseUserResponse = Array<
  Omit<User, 'lastName' | 'passwordHash'> & { last_name?: string; password: string }
>;
