import 'dotenv/config';
import { cleanEnv, port, str } from 'envalid';

export const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  NODE_ENV: str({ choices: ['development', 'production'], default: 'development' }),
});
