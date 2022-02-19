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

import {z} from 'zod';
import Login from '../../../application/user/Login';
import config from '../../../../config';
import {isProduction} from '../../../common/utils/nodeEnv';
import {defineRoute, defineSchema} from '@inu-cafeteria/backend-core';

const schema = defineSchema({
  body: {
    username: z.string(),
    password: z.string(),
  },
});

export default defineRoute('post', '/login', schema, async (req, res) => {
  const {username, password} = req.body;

  const {jwt} = await Login.run({username, password});

  return res
    .status(201)
    .cookie(config.cookie.tokenName, jwt, {
      path: '/',
      secure: isProduction(),
      domain: config.cookie.domain,
      // sameSite: 'none', // 이 옵션을 안 주어야 크롬에서 로컬 개발 할 수 있음.
    })
    .send();
});
