import { createServer, Server } from 'http';
import { handleRequest } from './handlers';

const JSON_CONTENT_TYPE = 'application/json; charset=utf-8';

export function createHttpServer(): Server {
  const server = createServer((req, res) => {
    handleRequest(req, res).catch((error) => {
      console.error('Unhandled error while processing request.', error);
      if (res.writableEnded) {
        return;
      }

      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', JSON_CONTENT_TYPE);
      }

      res.end(JSON.stringify({ error: 'Internal server error' }));
    });
  });

  return server;
}

export function startServer(port = 3030): Promise<Server> {
  const server = createHttpServer();

  return new Promise((resolve, reject) => {
    const onError = (error: Error) => {
      server.off('error', onError);
      reject(error);
    };

    server.once('error', onError);
    server.listen(port, () => {
      server.off('error', onError);
      resolve(server);
    });
  });
}
