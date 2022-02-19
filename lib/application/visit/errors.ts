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

import {BadRequest} from '@inu-cafeteria/backend-core';

export const NotIdentifiable = BadRequest.of(
  'not_identifiable',
  '학번과 전화번호 중 하나는 있어야 합니다.'
);

export const CafeteriaNotExist = BadRequest.of(
  'cafeteria_not_exist',
  '해당 식당은 존재하지 않습니다.'
);
