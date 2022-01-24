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
import {logger} from '@inu-cafeteria/backend-core';
import BookingFinder from '../booking/finder/BookingFinder';
import {NoBookingParams} from './errors';
import {CafeteriaBookingParams, VisitRecord} from '@inu-cafeteria/backend-core';

export default class Context {
  /**
   * (현재 시간대) 수용 가능 인원
   */
  capacity?: number;

  /**
   * (현재 시간대) 예약 인원
   */
  expected?: number;

  /**
   * (현재 시간대) 입장 인원
   */
  actual?: number;

  /**
   * 현재 상주 인원
   */
  total?: number;

  /**
   * 현재 타임 슬롯 시작
   */
  timeSlotStart?: Date;

  /**
   * 현재 타임 슬롯의 끝
   */
  timeSlotEnd?: Date;

  private static of(properties: Partial<Context>) {
    return Object.assign(new Context(), properties);
  }

  static async forNow(cafeteriaId: number, now: Date = new Date()): Promise<Context> {
    const params = await CafeteriaBookingParams.findByCafeteriaId(cafeteriaId);
    assert(params, NoBookingParams());

    const activeVisitors = await VisitRecord.findRecentRecords(
      cafeteriaId,
      params.userStaysForMinutes,
      now
    );

    // 이 식당에 최근 userStaysForMinutes분 내에 입장한 사람의 수
    const total = activeVisitors.length;

    const timeSlot = params.getCurrentTimeSlot(now);
    if (timeSlot == null) {
      logger.info('현재 시간은 예약을 운영하는 시간대가 아님!');

      return Context.of({total});
    }

    // 이 식당이 지원하는 시간대별 수용 한계
    const capacity = timeSlot.capacity;

    // 현재 시간대 예약들
    const bookings = await new BookingFinder().findAllByCafeteriaIdAndTimeSlotStart(
      cafeteriaId,
      timeSlot.start
    );

    // 이 식당에 현재 시간대에 예약한 사람의 수
    const expected = bookings.length;

    // 이 식당에 현재 시간대에 예약하고 입장까지 한 사람의 수
    const actual = bookings.filter((b) => b.checkIn).length;

    return Context.of({
      capacity,
      expected,
      actual,
      total,
      timeSlotStart: timeSlot.start,
      timeSlotEnd: timeSlot.end,
    });
  }
}
