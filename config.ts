import {isProduction} from './lib/common/utils/nodeEnv';
import {getEnv, getSecret} from '@inu-cafeteria/backend-core';

export default {
  server: {
    port: Number(getEnv('PORT')) || 8090,
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
    accessKeyId: getSecret('AWS_ACCESS_KEY_ID') || 'an_aws_id',
    secretAccessKey: getSecret('AWS_SECRET_ACCESS_KEY') || 'blahblah',
  },

  auth: {
    key: getSecret('JWT_SECRET_KEY') || 'whatever',
    expiresIn: '24h',

    adminUsername: getSecret('ADMIN_ID') || 'potados',
    adminPassword: getSecret('ADMIN_PW') || '1234',
  },
};
