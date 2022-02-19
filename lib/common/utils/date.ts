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

import moment from 'moment';
import assert from 'assert';

export function parseDateYYYYMMDD(dateString: string) {
  const m = moment(dateString, 'YYYYMMDD', true);

  assert(m.isValid(), `올바르지 않은 날짜 포맷입니다. YYYYMMDD 형식을 지켜 주세요: ${dateString}`);

  return m.toDate();
}

export function localDateString(date: Date) {
  const format = {
    M: (date.getMonth() + 1).toString().padStart(2, '0'),
    d: date.getDate().toString().padStart(2, '0'),
    D: date.getDate().toString().padStart(2, '0'),
    h: date.getHours().toString().padStart(2, '0'),
    m: date.getMinutes().toString().padStart(2, '0'),
    s: date.getSeconds().toString().padStart(2, '0'),
    y: date.getFullYear().toString().padStart(4, '0'),
    Y: date.getFullYear().toString().padStart(4, '0'),
  };

  return `${format.Y}-${format.M}-${format.D} ${format.h}:${format.m}:${format.s}`;
}
