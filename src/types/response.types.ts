export type HttpResponse = {
  status: 'success' | 'error';
  statusCode: number;
  message: string;
  data: object;
};
