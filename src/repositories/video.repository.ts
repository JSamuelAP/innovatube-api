import youtubeClient from '../config/clients/youtube.client';
import type { Video } from '../types';
import type { YouTubeApiResponse } from '../types/youtube.types';
import { normalizeVideoID } from '../utils/youTube';

export class VideoRepository {
  public async findById(id: string): Promise<Video | null> {
    const { data } = await youtubeClient.get<YouTubeApiResponse>('/videos', {
      params: { id: id, part: 'snippet' },
    });

    const item = data.items[0];
    if (!item) return null;

    const video: Video = {
      id: normalizeVideoID(item.id),
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
    };

    return video;
  }

  public async findByMultipleIds(...ids: string[]): Promise<Video[]> {
    if (ids.length === 0) return [];

    const { data } = await youtubeClient.get<YouTubeApiResponse>('/videos', {
      params: { id: ids.join(','), part: 'snippet' },
    });
    const videos: Video[] = data.items.map((item) => ({
      id: normalizeVideoID(item.id),
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
    }));

    return videos;
  }

  public async findBySearchTerm(query: string): Promise<Video[]> {
    const { data } = await youtubeClient.get<YouTubeApiResponse>('/search', {
      params: { q: query, type: 'video', part: 'snippet', maxResults: 12 },
    });
    const videos: Video[] = data.items.map((item) => ({
      id: normalizeVideoID(item.id),
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
    }));

    return videos;
  }
}
