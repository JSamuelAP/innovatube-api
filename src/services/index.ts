import { userRepository, videoRepository } from '../repositories';
import { AuthService } from './auth.service';
import { VideoService } from './video.service';

export const authService = new AuthService(userRepository);
export const videoService = new VideoService(videoRepository, userRepository);
