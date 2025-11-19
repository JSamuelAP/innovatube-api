export type HttpResponse = {
  status: 'success' | 'error';
  statusCode: number;
  message: string;
  data: object;
};

export type RecaptchaResponse = {
  success: boolean;
  challenge_ts: Date;
  hostname: string;
};
