import { ServerResponse } from 'http';
import { validate } from 'uuid';
import { dataUsers } from '../types/types';
import { errorRes, successOk,  } from '../util/response';
import { errorMsg } from '../types/types';

export const get = (
  url: string,
  res: ServerResponse,
  userDb: dataUsers,
): void => {
  if (url === '/api/users') {
    try {
      successOk(res, 200, userDb)
    } catch (error) {
      errorRes(res, 500, errorMsg.serverError);
    }
  } else if (url?.startsWith('/api/users/')) {
    const id = url.split('/')[3];
    const user = userDb.find((i) => i.id === id);

    if (!id) {
      errorRes(res, 404, errorMsg.notFound);
    } else if (!validate(id)) {
      errorRes(res, 400, errorMsg.invalidId);
    } else if (!user) {
      errorRes(res, 404, errorMsg.notFound);
    } else {
      successOk(res, 200, user);
    }
  } else {
    errorRes(res, 400, errorMsg.nonQuery);
  }
};