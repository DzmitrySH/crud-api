export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type dataUsers = IUser[];

export const enum errorMsg {
  nonQuery = 'Query not correctly',
  badRequest = 'Bad Request',
  notFound = 'User not found',
  invalidId = 'Invalid iD',
  serverError = 'Server Error',
  invalidBody = 'Invalid body'
}