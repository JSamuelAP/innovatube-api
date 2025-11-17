import type { UserFavorite } from '../types';

export class FavoriteRepository {
  public async findFavorites(userId: number): Promise<UserFavorite[]> {
    return [
      {
        userId: userId,
        videoId: 'QAshpZNMyCE',
      },
      {
        userId: userId,
        videoId: 'SAshpHnmYce',
      },
    ];
  }

  public async createUserFavorite(userFavorite: UserFavorite): Promise<UserFavorite | null> {
    return userFavorite;
  }

  public async deleteUserFavorite(userFavorite: UserFavorite): Promise<boolean> {
    return true;
  }
}
