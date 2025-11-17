import type { ID } from '../types/youtube.types';

export const normalizeVideoID = (id: ID): string => {
  return typeof id === 'string' ? id : id.videoId;
};
