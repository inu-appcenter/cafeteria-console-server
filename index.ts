import config from './config';
import startServer from './lib/infrastructure/webserver/server';
import {logger, setupLogger, startTypeORM} from '@inu-cafeteria/backend-core';

async function start() {
  await setupLogger({
    consoleTransportOptions: {
      prefix: undefined,
    },
    fileTransportOptions: {
      prefix: undefined,
      logDirectory: './logs',
    },
    cloudwatchTransportOptions: config.isProduction
      ? {
          prefix: 'console',
          region: config.aws.region,
          accessKeyId: config.aws.accessKeyId,
          secretAccessKey: config.aws.secretAccessKey,
          logGroupName: config.aws.cloudwatch.logGroupName,
        }
      : undefined,
  });

  await startTypeORM();

  await startServer();
}

start().then(() => {
  logger.info(`우효 wwwwwwwww ${config.server.port}포트♥, 서버 겟또다제~☆`);
});
