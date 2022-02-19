/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import config from './config';
import startServer from './lib/infrastructure/webserver/server';
import {logger, setupLogger, startTypeORM} from '@inu-cafeteria/backend-core';

async function start() {
  console.log('로거를 설정합니다.');

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

  logger.info('DB 시작하는중!!');
  await startTypeORM();

  logger.info('서버 시작하는중!!');
  await startServer();
}

start()
  .then(() => {
    logger.info(`우효 wwwwwwwww ${config.server.port}포트♥, 서버 겟또다제~☆`);
  })
  .catch((e) => {
    console.error(e);
    console.log(';; 서버 시작에 실패했습니다');
  });
