import { ServerResponse } from 'http';
import { validate } from 'uuid';
import { dataUsers, errorMsg } from '../types/types';
import { errorRes, successOk, headerRes } from '../util/response';

export const remov = (
  url: string,
  res: ServerResponse,
  aserDb: dataUsers,
): void => {
  if (url?.startsWith('/api/users/')) {
    const id = url.split('/')[3];
    try {
      const user = aserDb.find((i) => i.id === id);
      if (!id) {
        errorRes(res, 404, errorMsg.notFound);
      } else if (!validate(id)) {
        errorRes(res, 400, errorMsg.invalidId);
      } else if (!user) {
        errorRes(res, 404, errorMsg.notFound);
      } else {
        const deleteUser = aserDb.splice(parseInt(id) - 1, 1);
        res.writeHead(204, headerRes);
        res.end(JSON.stringify(deleteUser));
      }
    } catch (err) {
      errorRes(res, 500, errorMsg.serverError);
    }
  } else {
    errorRes(res, 400, errorMsg.invalidBody);
  }
};