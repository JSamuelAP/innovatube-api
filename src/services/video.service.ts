import type { UserRepository } from '../repositories/user.repository';
import type { VideoRepository } from '../repositories/video.respository';
import type { UserFavorite, Video } from '../types';
import { AppError } from '../utils/AppError';

export class VideoService {
  constructor(
    private readonly videoRespository: VideoRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async getBySearchTerm(query: string): Promise<Video[]> {
    const videos = await this.videoRespository.findBySearchTerm(query);
    return videos;
  }

  public async getFavorites(userId: number): Promise<Video[]> {
    const favorites = await this.videoRespository.findFavorites(userId);
    const ids = favorites.map((favorite) => favorite.videoId);
    return await this.videoRespository.findByMultipleIds(...ids);
  }

  public async markAsFavorite(userFavorite: UserFavorite): Promise<UserFavorite> {
    const user = await this.userRepository.findById(userFavorite.userId);
    if (!user) {
      throw new AppError(`No user with id '${userFavorite.userId}' was found`, 404);
    }

    const video = await this.videoRespository.findById(userFavorite.videoId);
    if (!video) {
      throw new AppError(`No video with id '${userFavorite.videoId}' was found`, 404);
    }

    const userFavoriteCreated = await this.videoRespository.createUserFavorite(userFavorite);
    if (!userFavoriteCreated) {
      throw new AppError('An error occurred while marking the video as a favorite', 500);
    }

    return userFavoriteCreated;
  }

  public async unmarkAsFavorito(userFavorite: UserFavorite): Promise<boolean> {
    const deleted = await this.videoRespository.deleteUserFavorite(userFavorite);
    if (!deleted) {
      throw new AppError('An error occurred while unmarking the video as a favorite', 500);
    }
    return true;
  }
}
