import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuid} from 'uuid';
import { correctData } from '../util/correctData';
import { dataUsers, IUser } from '../types/types';
import { errorRes, successOk, headerRes } from '../util/response';

export const post = async (
  url: string,
  req: IncomingMessage,
  res: ServerResponse,
  userDb: dataUsers,
): Promise<void> => {
  if (url === '/api/users') {
    try {
      let data: IUser = await correctData(req, res);
      if (
        ['username', 'age', 'hobbies'].every((key) => data.hasOwnProperty(key)) &&
        Array.isArray(data.hobbies) &&
        data.username.trim().length > 0
      ) {
        const { username, age, hobbies } = data;
        const getUser: IUser = {
          id: uuid(),
          username: username.trim(),
          age,
          hobbies,
        };
        res.writeHead(201, headerRes);
        userDb.push(getUser);
        res.end(JSON.stringify(getUser));
      } else {
        errorRes(res, 400, process.env.USER_ID_ERROR_MESSAGE as string);
      }
    } catch (error) {
      errorRes(res, 500, process.env.SERVER_ERROR_MESSAGE as string);
    }
  } else {
    errorRes(res, 400, process.env.BODY_ERROR_MESSAGE as string);
  }
};
