import type { UserFavorite, Video } from '../types';

export class VideoRepository {
  public async findById(id: string): Promise<Video | null> {
    return {
      id: 'QAshpZNMyCE',
      title: 'Three body problem trilogy | books',
      thumbnailUrl: 'image.png',
    };
  }

  public async findByMultipleIds(...ids: string[]): Promise<Video[]> {
    return [
      {
        id: '1',
        title: 'Three body problem trilogy | books',
        thumbnailUrl: 'image.png',
      },
      {
        id: '2',
        title: 'All about trisolarians',
        thumbnailUrl: 'image.png',
      },
    ];
  }

  public async findBySearchTerm(query: string): Promise<Video[]> {
    return [
      {
        id: '1',
        title: 'Three body problem trilogy | books',
        thumbnailUrl: 'image.png',
      },
      {
        id: '2',
        title: 'All about trisolarians',
        thumbnailUrl: 'image.png',
      },
    ];
  }

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
