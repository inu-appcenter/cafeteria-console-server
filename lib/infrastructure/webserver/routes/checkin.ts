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
import {authorizer} from '../libs/middlewares/authorizer';
import {defineRoute} from '../libs/route';
import {defineSchema} from '../libs/schema';
import PerformCheckIn from '../../../application/checkin/PerformCheckIn';
import {stringAsInt} from '../../../common/utils/zodTypes';

const schema = defineSchema({
  body: {
    ticket: z.string(),
    cafeteriaId: z.number(),
    gracefulInTime: z.boolean().optional().default(false),
  },
});

export default defineRoute('post', '/checkin', schema, authorizer, async (req, res) => {
  const {ticket, cafeteriaId, gracefulInTime} = req.body;

  await PerformCheckIn.run({ticket, cafeteriaId, gracefulInTime});

  return res.send();
});
