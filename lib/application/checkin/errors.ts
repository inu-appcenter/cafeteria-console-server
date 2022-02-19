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

export const NoBookingParams = BadRequest.of(
  'no_booking_params',
  '해당 식당의 예약 옵션이 존재하지 않습니다.'
);

export const NoTimeSlot = BadRequest.of(
  'no_time_slot',
  '해당 식당 예약 옵션의 타임 슬롯이 존재하지 않습니다.'
);

export const NoBooking = BadRequest.of('no_booking', '예약 내역이 없습니다.');

export const CheckInNotInPlace = BadRequest.of(
  'check_in_not_in_place',
  '다른 식당의 예약은 사용하실 수 없습니다.'
);

export const CheckInAlreadyMade = BadRequest.of(
  'check_in_already_made',
  '이미 체크인이 완료되었습니다.'
);

export const CheckInNotInTime = BadRequest.of(
  'check_in_not_in_time',
  '체크인이 어려운 시각입니다.'
);
