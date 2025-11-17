import type { VideoRepository } from '../repositories/video.repository';
import type { Video } from '../types';

export class VideoService {
  constructor(private readonly videoRespository: VideoRepository) {}

  public async getBySearchTerm(query: string): Promise<Video[]> {
    const videos = await this.videoRespository.findBySearchTerm(query);
    return videos;
  }
}
