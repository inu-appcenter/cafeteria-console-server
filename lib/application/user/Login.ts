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

import assert from 'assert';
import config from '../../../config';
import UseCase from '../../core/base/UseCase';
import {InvalidAuth} from './errors';
import {logger, createJwt} from '@inu-cafeteria/backend-core';

export type LoginParams = {
  username: string;
  password: string;
};

export type LoginResult = {
  jwt: string;
};

class Login extends UseCase<LoginParams, LoginResult> {
  async onExecute({username, password}: LoginParams): Promise<LoginResult> {
    logger.verbose(`${username}님이 로그인을 하러 오셨군요...?`);

    const ok = username === config.auth.adminUsername && password === config.auth.adminPassword;

    assert(ok, InvalidAuth());

    logger.verbose(`좋아, ${username}에게 로그인을 허가하여 주겠다....`);

    const jwt = createJwt({username}, config.auth.key, {
      expiresIn: config.auth.expiresIn,
    });

    return {jwt};
  }
}

export default new Login();
