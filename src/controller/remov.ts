import { ServerResponse } from 'http';
import { validate } from 'uuid';
import { dataUsers } from '../types/types';
import { errorRes, successOk, headerRes } from '../util/response';

export const remov = (
  url: string,
  res: ServerResponse,
  aserDb: dataUsers,
) => {
  if (url?.startsWith('/api/users/')) {
    const id = url.split('/')[3];
    try {
      const user = aserDb.find((i) => i.id === id);
      if (!id) {
        errorRes(res, 404, process.env.USER_ERROR_MESSAGE as string);
      } else if (!validate(id)) {
        errorRes(res, 400, process.env.USER_ID_ERROR_MESSAGE as string);
      } else if (!user) {
        errorRes(res, 404, process.env.USER_ERROR_MESSAGE as string);
      } else {
        const deleteUser = aserDb.splice(parseInt(id) - 1, 1);
        res.writeHead(204, headerRes);
        res.end(JSON.stringify(deleteUser));
      }
    } catch (err) {
      errorRes(res, 500, process.env.SERVER_ERROR_MESSAGE as string);
    }
  } else {
    errorRes(res, 400, process.env.BODY_ERROR_MESSAGE as string);
  }
};