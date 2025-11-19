import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { env } from '../env';

const recaptchaClient: AxiosInstance = axios.create({
  baseURL: env.RECAPTCHA_URL,
});

recaptchaClient.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['secret'] = env.RECAPTCHA_SECRET;
  return config;
});

export default recaptchaClient;
