import getEnv from './lib/utils/env';
import {isProduction} from './lib/utils/nodeEnv';

export default {
  server: {
    port: Number(getEnv('PORT')) || 8081,
  },

  cors: {
    allowedHostsInProduction: ['https://console.inu-cafeteria.app'],
  },

  cookie: {
    domain: isProduction() ? 'inu-cafeteria.app' : undefined,
    tokenName: 'cafeteria-console-server-token',
  },

  aws: {
    cloudwatch: {
      logGroupName: 'cafeteria-console-server',
      serviceLogFetchParams: {
        logGroupName: 'cafeteria-server',
        logStreamName: 'combined',
      },
    },
    region: 'ap-northeast-2',
    accessKeyId: getEnv('AWS_ACCESS_KEY_ID') || 'an_aws_id',
    secretAccessKey: getEnv('AWS_SECRET_ACCESS_KEY') || 'blahblah',
  },

  auth: {
    key: getEnv('JWT_SECRET_KEY') || 'whatever',
    expiresIn: '24h',

    adminUsername: getEnv('ADMIN_ID') || 'potados',
    adminPassword: getEnv('ADMIN_PW') || '1234',
  },
};
