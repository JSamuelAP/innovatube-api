import type { FavoriteRepository } from '../repositories/favorite.repository';
import type { UserRepository } from '../repositories/user.repository';
import type { VideoRepository } from '../repositories/video.repository';
import type { UserFavorite, Video } from '../types';
import { AppError } from '../utils/AppError';

export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly userRepository: UserRepository,
    private readonly videoRepository: VideoRepository,
  ) {}

  public async getFavorites(userId: number): Promise<Video[]> {
    const favorites = await this.favoriteRepository.findFavorites(userId);
    const ids = favorites.map((favorite) => favorite.videoId);
    return await this.videoRepository.findByMultipleIds(...ids);
  }

  public async markAsFavorite(userFavorite: UserFavorite): Promise<UserFavorite> {
    const user = await this.userRepository.findById(userFavorite.userId);
    if (!user) {
      throw new AppError(`No user with id '${userFavorite.userId}' was found`, 404);
    }

    const video = await this.videoRepository.findById(userFavorite.videoId);
    if (!video) {
      throw new AppError(`No video with id '${userFavorite.videoId}' was found`, 404);
    }

    const userFavoriteCreated = await this.favoriteRepository.createUserFavorite(userFavorite);
    if (!userFavoriteCreated) {
      throw new AppError('An error occurred while marking the video as a favorite', 500);
    }

    return userFavoriteCreated;
  }

  public async unmarkAsFavorite(userFavorite: UserFavorite): Promise<boolean> {
    const deleted = await this.favoriteRepository.deleteUserFavorite(userFavorite);
    if (!deleted) {
      throw new AppError('An error occurred while unmarking the video as a favorite', 500);
    }
    return true;
  }
}
