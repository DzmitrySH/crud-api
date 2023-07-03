import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import { correctData } from '../util/correctData';
import { dataUsers, IUser } from '../types/types';
import { errorRes, successOk, headerRes } from '../util/response';
import { errorMsg } from '../types/types';

export const put = async (
  url: string,
  req: IncomingMessage,
  res: ServerResponse,
  userDb: dataUsers
): Promise<void> => {
  if (url?.startsWith('/api/users/')) {
    const id = url.split('/')[3];
    if (!id) {
      errorRes(res, 404, errorMsg.notFound);
    } else if (!validate(id)) {
      errorRes(res, 400, errorMsg.invalidId);
    } else if (!userDb.find((i) => i.id === id)) {
      errorRes(res, 404, errorMsg.notFound);
    } else {
      try {
        const data: IUser = await correctData(req, res);
        if (
          ['username', 'age', 'hobbies'].every((key) => 
          data.hasOwnProperty(key)) &&
          Array.isArray(data.hobbies) &&
          data.username.trim().length > 0
        ) {
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
        } else {
          errorRes(res, 400, errorMsg.nonQuery);
          }
      } catch (err) {
      errorRes(res, 500, errorMsg.serverError);
      }
    }
  } else {
  errorRes(res, 400, errorMsg.invalidBody);
  }
};
