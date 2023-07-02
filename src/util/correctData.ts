import { IncomingMessage, ServerResponse } from 'http';

export const correctData = async (
  req: IncomingMessage,
  res: ServerResponse
  ): Promise<any> => {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk.toString() });
    req.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      } catch (error) { reject(error) }
    });
    req.on('error', (error) => {reject(error) });
  });
};