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

import path from 'path';
import cors from 'cors';
import config from '../../../config';
import express from 'express';
import cookieParser from 'cookie-parser';
import {isProduction} from '../../common/utils/nodeEnv';
import {authorizer, errorHandler, recorder, registerRoutes} from '@inu-cafeteria/backend-core';

const allowList = ['/', '/login', '/version'];

const myCors = cors({
  origin: isProduction() ? config.cors.allowedHostsInProduction : true,
  credentials: true,
});

const myAuthorizer = authorizer({
  jwtKey: config.auth.key,
  jwtFieldName: config.cookie.tokenName,
  allowList,
});

async function startServer() {
  const app = express();

  app.use(myCors);

  app.use(cookieParser());
  app.use(myAuthorizer);

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use(recorder());

  await registerRoutes(app, path.join(__dirname, 'routes'));

  app.use(errorHandler());

  app.listen(config.server.port);
}

export default startServer;
