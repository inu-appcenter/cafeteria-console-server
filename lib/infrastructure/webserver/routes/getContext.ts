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

import {defineSchema} from '../libs/schema';
import {defineRoute} from '../libs/route';
import {authorizer} from '../libs/middlewares/authorizer';
import GetCheckInContext from '../../../application/checkin/GetCheckInContext';
import {stringAsBoolean, stringAsInt} from '../../../common/utils/zodTypes';
import RealTimeCheckInService from '../../../application/checkin/RealTimeCheckInService';

const schema = defineSchema({
  query: {
    cafeteriaId: stringAsInt,
    sse: stringAsBoolean.optional(),
  },
});

export default defineRoute('get', '/checkin/context', schema, authorizer, async (req, res) => {
  const {cafeteriaId, sse} = req.query;

  if (sse === true) {
    RealTimeCheckInService.addContextListener(cafeteriaId, res);

    return await RealTimeCheckInService.emitContext(cafeteriaId);
  } else {
    const context = await GetCheckInContext.run({cafeteriaId});

    return res.json(context);
  }
});
