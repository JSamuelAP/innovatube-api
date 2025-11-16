import type { HttpResponse } from '../types';

export const formatSuccessResponse = (statusCode: number, message: string, data: object): HttpResponse => {
  return {
    status: 'success',
    statusCode: statusCode,
    message: message,
    data: data,
  };
};

export const formatErrorResponse = (statusCode: number, message: string): HttpResponse => {
  return {
    status: 'error',
    statusCode: statusCode,
    message: message,
    data: {},
  };
};
