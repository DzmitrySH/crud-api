import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import { correctData } from '../util/correctData';
import { dataUsers, IUser } from '../types/types';
import { errorRes, successOk, headerRes } from '../util/response';

export const changeUser = async (
  url: string,
  req: IncomingMessage,
  res: ServerResponse,
  userDb: dataUsers
): Promise<void> => {
  if (url?.startsWith('/api/users/')) {
    const id = url.split('/')[3];
    if (!id) {
    errorRes(res, 404, process.env.USER_ERROR_MESSAGE as string);
    } else if (!validate(id)) {
    errorRes(res, 400, process.env.USER_ID_ERROR_MESSAGE as string);
    } else if (!userDb.find((i) => i.id === id)) {
    errorRes(res, 404, process.env.USER_ERROR_MESSAGE as string);
    } else {
      try {
        const data: IUser = await correctData(req, res);
        if (
          ['username', 'age', 'hobbies'].every((key) => data.hasOwnProperty(key)) &&
          Array.isArray(data.hobbies) &&
          data.username.trim().length > 0
        ) {
        errorRes(res, 400, process.env.BODY_ERROR_MESSAGE as string);
        } else {
          const { username, age, hobbies } = data;
          const correctUser: IUser = {
            id,
            username: username.trim(),
            age,
            hobbies,
          };
          const index = userDb.findIndex((i) => i.id === id);
          userDb[index] = correctUser;
          res.writeHead(200, headerRes);
          res.end(JSON.stringify(correctUser));
        }
      } catch (err) {
      errorRes(res, 500, process.env.SERVER_ERROR_MESSAGE as string);
      }
    }
  } else {
  errorRes(res, 400, process.env.BODY_ERROR_MESSAGE as string);
  }
};
