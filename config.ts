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

import {isProduction} from './lib/common/utils/nodeEnv';
import {getEnv, getSecret} from '@inu-cafeteria/backend-core';

export default {
  isProduction: isProduction(),

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

  microservices: {
    endpoints: {
      api: {
        baseUrl: isProduction() ? 'https://api.inu-cafeteria.app' : 'http://localhost:9999',
        bookingsUpdated: `${apiServerBaseUrl()}/internal/updates/bookings`,
      },
    },
  },
};

function apiServerBaseUrl() {
  return isProduction() ? 'https://api.inu-cafeteria.app' : 'http://localhost:9999';
}
