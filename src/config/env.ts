import 'dotenv/config';
import { cleanEnv, port, str, url, num } from 'envalid';

export const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  NODE_ENV: str({ choices: ['development', 'production'], default: 'development' }),
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: num({ default: 21600 }),
  SUPABASE_API_URL: url(),
  SUPABASE_API_KEY: str(),
  YOUTUBE_API_URL: url(),
  YOUTUBE_API_KEY: str(),
});
