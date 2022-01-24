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

import {logger} from '@inu-cafeteria/backend-core';
import {defineRoute} from '../libs/route';
import {defineSchema} from '../libs/schema';

// 이 서버의 버전! 앱 버전 아님!

const schema = defineSchema({});

export default defineRoute('get', '/version', schema, async (req, res) => {
  const version = process.env.npm_package_version;

  logger.info(`버전을 묻는 것이냐...? 그래 알려주마.. ${version}이다...`);

  res.send(version);
});
