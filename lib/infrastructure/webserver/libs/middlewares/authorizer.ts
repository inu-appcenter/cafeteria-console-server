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

import config from '../../../../../config';
import express from 'express';
import {decodeJwt} from '../../../../common/utils/jwt';
import assert from 'assert';
import {InvalidJwt, NotLoggedIn} from '../../../../application/user/errors';

export const authorizer: express.RequestHandler<any, any, any, any> = (req, res, next) => {
  const token = req.cookies[config.cookie.tokenName];

  validateToken(token);

  next();
};

function validateToken(token?: string) {
  assert(token, NotLoggedIn());

  const decoded = decodeJwt(token);
  assert(decoded, InvalidJwt());
  assert(typeof decoded === 'object', InvalidJwt());

  const {username} = decoded as Record<string, string>;
  assert(username, InvalidJwt());
  assert(username === config.auth.adminUsername, InvalidJwt());
}
