import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { env } from '../env';

const youtubeClient: AxiosInstance = axios.create({
  baseURL: env.YOUTUBE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

youtubeClient.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['key'] = env.YOUTUBE_API_KEY;
  return config;
});

export default youtubeClient;
