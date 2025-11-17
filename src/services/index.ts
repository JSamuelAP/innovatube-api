import { favoriteRepository, userRepository, videoRepository } from '../repositories';
import { AuthService } from './auth.service';
import { FavoriteService } from './favorite.service';
import { VideoService } from './video.service';

export const authService = new AuthService(userRepository);
export const favoriteService = new FavoriteService(favoriteRepository, userRepository, videoRepository);
export const videoService = new VideoService(videoRepository);
