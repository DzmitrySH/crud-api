import { ServerResponse } from 'http';
import { dataUsers } from '../types/types';

export const headerRes = { 'Content-Type': 'application/json' };

export const errorRes = (
  res: ServerResponse,
  code: number,
  message: string
): void => {
  res.writeHead(code, headerRes);
  res.end(JSON.stringify( message ));
};

export const successOk = (
  res: ServerResponse,
  code: number,
  data?: dataUsers
): void => {
  res.writeHead(code, headerRes);
  if (data) res.end(JSON.stringify(data));
  else res.end();
};