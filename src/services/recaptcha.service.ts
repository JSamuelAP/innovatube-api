import recaptchaClient from '../config/clients/recaptcha.client';
import type { RecaptchaResponse } from '../types';

export class RecaptchaService {
  public async validateCaptcha(recaptchaToken: string): Promise<boolean> {
    const { data } = await recaptchaClient.get<RecaptchaResponse>('', {
      params: {
        response: recaptchaToken,
      },
    });
    return data.success;
  }
}
