import startServer from './lib/server';
import config from './config';
import {startTypeORM} from '@inu-cafeteria/backend-core';
import logger from './lib/utils/logger';

async function start() {
  await startTypeORM();

  await startServer();
}

start().then(() => {
  logger.info(`우효 wwwwwwwww ${config.server.port}포트♥, 서버 겟또다제~☆`);
});
