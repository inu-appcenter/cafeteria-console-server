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

import packageInfo from '../../../../package.json';
import {defineRoute} from '../libs/route';
import {defineSchema} from '../libs/schema';
import ConnectionPool from '../libs/ConnectionPool';
import RealTimeCheckInService from '../../../application/checkin/RealTimeCheckInService';

const schema = defineSchema({});

export default defineRoute('get', '/', schema, async (req, res) => {
  return res.send(
    `카페테리아 콘솔 API 서버 v${packageInfo.version} 
    / 서버시각 ${new Date().toLocaleString()} 
    / 비상연락 010-2922-2661(앱센터 송병준) 
    / 오이! 여긴 어떻게 알았냐구!`
  );
});
