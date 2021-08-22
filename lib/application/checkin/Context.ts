import {Booking, CafeteriaBookingParams, VisitRecord} from '@inu-cafeteria/backend-core';
import assert from 'assert';
import {addMinutes, isAfter, isBefore} from 'date-fns';
import {MoreThan} from 'typeorm';

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

  private static of(properties: Partial<Context>) {
    return Object.assign(new Context(), properties);
  }

  static async forNow(cafeteriaId: number, now: Date = new Date()): Promise<Context> {
    const params = await CafeteriaBookingParams.findOne({cafeteriaId});
    assert(params, `해당 식당(${cafeteriaId})의 예약 옵션이 존재하지 않습니다.`);

    const allTimeSlots = params.allTimeSlots(now).sort();
    const currentTimeSlot = allTimeSlots.reduce(
      (acc, cur) => (isAfter(now, acc) && isBefore(now, cur) ? acc : cur) // TODO 테스트 필요
    );

    const capacity = params.capacity;

    const bookings = await Booking.find({
      where: {cafeteriaId, timeSlot: currentTimeSlot},
      relations: ['checkIn'],
    });

    const expected = bookings.length;
    const actual = bookings.filter((b) => b.checkIn).length;

    const mostOldVisitTime = addMinutes(now, -params.durationMinutes);
    const validRecords = await VisitRecord.find({visitedAt: MoreThan(mostOldVisitTime)});

    const total = validRecords.length;

    return Context.of({
      capacity,
      expected,
      actual,
      total,
    });
  }
}
