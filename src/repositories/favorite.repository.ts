import supabaseClient from '../config/clients/supabase.client';
import type { UserFavorite } from '../types';
import type { SupabaseFavoriteResponse } from '../types/supabase.types';

export class FavoriteRepository {
  public async findFavorites(userId: number): Promise<UserFavorite[]> {
    const { data } = await supabaseClient.get<SupabaseFavoriteResponse>('/user_favorite', {
      params: { select: '*', user_id: `eq.${userId}` },
    });

    const favorites: UserFavorite[] = data.map((favorite) => ({
      userId: favorite.user_id,
      videoId: favorite.video_id,
    }));

    return favorites;
  }

  public async createUserFavorite(userFavorite: UserFavorite): Promise<UserFavorite | null> {
    const body = { user_id: userFavorite.userId, video_id: userFavorite.videoId };
    const { data } = await supabaseClient.post<SupabaseFavoriteResponse>('/user_favorite', body, {
      headers: { Prefer: 'return=representation' },
    });

    const createdFavorite = data[0];
    if (!createdFavorite) return null;

    return userFavorite;
  }

  public async deleteUserFavorite(userFavorite: UserFavorite): Promise<boolean> {
    await supabaseClient.delete('/user_favorite', {
      params: { user_id: `eq.${userFavorite.userId}`, video_id: `eq.${userFavorite.videoId}` },
    });
    return true;
  }
}
