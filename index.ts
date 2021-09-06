import config from './config';
import startServer from './lib/infrastructure/webserver/server';
import {logger, setupLogger, startTypeORM} from '@inu-cafeteria/backend-core';

async function start() {
  setupLogger({
    consoleTransportOptions: {
      prefix: undefined,
    },
  });

  await startTypeORM();

  await startServer();
}

start().then(() => {
  logger.info(`우효 wwwwwwwww ${config.server.port}포트♥, 서버 겟또다제~☆`);
});
