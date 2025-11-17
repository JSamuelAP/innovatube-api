import { FavoriteRepository } from './favorite.repository';
import { UserRepository } from './user.repository';
import { VideoRepository } from './video.respository';

export const favoriteRepository = new FavoriteRepository();
export const userRepository = new UserRepository();
export const videoRepository = new VideoRepository();
