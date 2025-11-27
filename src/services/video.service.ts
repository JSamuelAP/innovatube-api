import type { FavoriteRepository } from '../repositories/favorite.repository';
import type { VideoRepository } from '../repositories/video.repository';
import type { Video } from '../types';

export class VideoService {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly favoriteRepository: FavoriteRepository,
  ) {}

  public async getBySearchTerm(query: string, userId: number): Promise<Video[]> {
    const videos = await this.videoRepository.findBySearchTerm(query);
    const videoIds: string[] = videos.map((video) => video.id);

    const favoriteIds = await this.favoriteRepository.findFavoriteIdsByUser(userId, videoIds);
    const favoriteSet = new Set(favoriteIds);

    return videos.map((video) => ({
      ...video,
      isFavorite: favoriteSet.has(video.id),
    }));
  }
}
