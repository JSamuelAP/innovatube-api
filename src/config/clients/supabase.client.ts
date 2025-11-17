import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { env } from '../env';

const supabaseClient: AxiosInstance = axios.create({
  baseURL: env.SUPABASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

supabaseClient.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers['apiKey'] = env.SUPABASE_API_KEY;
  return config;
});

export default supabaseClient;
