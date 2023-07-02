import { ServerResponse } from 'http';
import { validate } from 'uuid';
import { dataUsers } from '../types/types';
import { errorRes, successOk,  } from '../util/response';

export const get = (
  url: string,
  res: ServerResponse,
  userDb: dataUsers,
): void => {
  if (url === '/api/users') {
    try {
      successOk(res, 200, userDb)
    } catch (error) {
      errorRes(res, 500, process.env.SERVER_ERROR_MESSAGE as string);
    }
  } else if (url?.startsWith('/api/users/')) {
    const id = url.split('/')[3];
    const user = userDb.find((i) => i.id === id);

    if (!id) {
      errorRes(res, 404, process.env.USER_ERROR_MESSAGE as string);
    } else if (!validate(id)) {
      errorRes(res, 400, process.env.USER_ID_ERROR_MESSAGE as string);
    } else if (!user) {
      errorRes(res, 404, process.env.USER_ERROR_MESSAGE as string);
    } else {
      successOk(res, 200, user);
    }
  } else {
    errorRes(res, 400, process.env.BODY_ERROR_MESSAGE as string);
  }
};