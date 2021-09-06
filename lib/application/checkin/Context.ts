import {Booking, CafeteriaBookingParams, VisitRecord} from '@inu-cafeteria/backend-core';
import assert from 'assert';
import {NoBookingParams} from './errors';
import {logger} from '@inu-cafeteria/backend-core';

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
    assert(params, NoBookingParams());

    // 이 식당이 지원하는 시간대별 수용 한계
    const capacity = params.capacity;

    const activeVisitors = await VisitRecord.findRecentRecords(
      cafeteriaId,
      params.durationMinutes,
      now
    );

    // 이 식당에 최근 durationMinutes분 내에 입장한 사람의 수
    const total = activeVisitors.length;

    const currentTimeSlot = params.currentTimeSlot(now);

    if (currentTimeSlot == null) {
      logger.info('현재 시간은 예약 시간대가 아님!');
      return Context.of({capacity, total});
    }

    const bookings = await Booking.find({
      where: {cafeteriaId, timeSlot: currentTimeSlot},
      relations: ['checkIn'],
    });

    // 이 식당에 현재 시간대에 예약한 사람의 수
    const expected = bookings.length;

    // 이 식당에 현재 시간대에 예약하고 입장까지 한 사람의 수
    const actual = bookings.filter((b) => b.checkIn).length;

    return Context.of({
      capacity,
      expected,
      actual,
      total,
    });
  }
}
