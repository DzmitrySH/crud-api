import { ServerResponse } from 'http';
import { dataUsers, IUser } from '../types/types';

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
  res: ServerResponse | never,
  code: number,
  data?: dataUsers | IUser,
): void => {
  res.writeHead(code, headerRes);
  res.end(JSON.stringify(data));
};
