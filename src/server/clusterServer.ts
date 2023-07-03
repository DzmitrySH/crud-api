import { createServer, IncomingMessage, ServerResponse } from 'http';
import { setMaxListeners } from 'node:events';
import cluster from 'cluster';
import { cpus } from 'os';
import { switchServer } from './switchServer';
import { dataUsers } from '../types/types';
import 'dotenv/config';

setMaxListeners(36);
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const MULTI_PORT = process.env.MULTI_PORT || 4001;
const args = process.argv.slice(2);
let dbSet: dataUsers = [];
const cpuCount = cpus().length;

const server = createServer((
  req: IncomingMessage, 
  res: ServerResponse
  ): void => {
  switchServer(req, res, dbSet);
})

const singlServer = (): void => {
  server.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
  });
}

const multiServers = (): void => {
  if (cluster.isPrimary) {
    console.log(`The total number of CPUs is ${cpuCount}`);
    console.log(`Primary pid ${process.pid}`)
    cpus().forEach((CpuInfo, index) => {
      const port = +MULTI_PORT + index;
      cluster.fork({ MULTI_PORT: port });
      cluster.on('message', async (worker, message) => {
        worker.send(message);
      });
    })
  }
  if (cluster.isWorker) {
    server.listen(process.env.MULTI_PORT, () => {
      console.log(`Server started ${MULTI_PORT}, worker pid=${process.pid}`);
    });
    process.on('message', (message: dataUsers) => {
      dbSet = message;
    });
  }
}
export const runServer = args.length ? multiServers() : singlServer()