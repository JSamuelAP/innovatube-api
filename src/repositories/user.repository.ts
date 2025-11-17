import supabaseClient from '../config/clients/supabase.client';
import type { CreateUserDTO, User } from '../types';
import type { SupabaseUserResponse } from '../types/supabase.types';

export class UserRepository {
  public async findById(id: number): Promise<User | null> {
    const { data } = await supabaseClient.get<SupabaseUserResponse>('/user', {
      params: { select: '*', deleted_at: 'is.null', id: id },
    });

    const user = data[0];
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      lastName: user.last_name || '',
      username: user.username,
      email: user.email,
      passwordHash: user.password,
    };
  }

  public async findByEmailOrUsername(username: string, email: string): Promise<User | null> {
    const { data } = await supabaseClient.get<SupabaseUserResponse>('/user', {
      params: { select: '*', deleted_at: 'is.null', or: `(email.eq.${email},username.eq.${username})` },
    });

    const user = data[0];
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      lastName: user.last_name || '',
      username: user.username,
      email: user.email,
      passwordHash: user.password,
    };
  }

  public async findByLoginIdentifier(identifier: string): Promise<User | null> {
    const { data } = await supabaseClient.get<SupabaseUserResponse>('/user', {
      params: { select: '*', deleted_at: 'is.null', or: `(email.eq.${identifier},username.eq.${identifier})` },
    });

    const user = data[0];
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      lastName: user.last_name || '',
      username: user.username,
      email: user.email,
      passwordHash: user.password,
    };
  }

  public async create(user: CreateUserDTO): Promise<User | null> {
    const { data } = await supabaseClient.post<SupabaseUserResponse>('/user', user, {
      headers: { Prefer: 'return=representation' },
    });

    const createdUser = data[0];
    if (!createdUser) return null;

    return {
      id: createdUser.id,
      name: createdUser.name,
      lastName: createdUser.last_name || '',
      username: createdUser.username,
      email: createdUser.email,
      passwordHash: createdUser.password,
    };
  }
}
