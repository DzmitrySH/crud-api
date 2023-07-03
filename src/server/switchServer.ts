import { IncomingMessage, ServerResponse } from 'http';
import { get } from '../controller/get';
import { post } from '../controller/post';
import { put } from '../controller/put';
import { remov } from '../controller/remov';
import { dataUsers, errorMsg } from '../types/types';
import { errorRes } from '../util/response';

export const switchServer = (
  req: IncomingMessage,
  res: ServerResponse,
  dbSet: dataUsers
  ): void => {
  const { method, url } = req;
  switch (method) {
    case 'GET': if (url) get(url, res, dbSet); 
      break;
    case 'POST': if (url) post(url, req, res, dbSet);
      break;
    case 'PUT': if (url) put(url, req, res, dbSet);
      break;
    case 'DELETE': if (url) remov(url, res, dbSet);
      break;
    default:
      errorRes(res, 400, errorMsg.nonQuery);
  }
};