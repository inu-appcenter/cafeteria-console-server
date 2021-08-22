import UseCase from '../../core/base/UseCase';
import {Booking, CheckIn, VisitRecord} from '@inu-cafeteria/backend-core';
import assert from 'assert';
import logger from '../../utils/logger';

export type CheckInParams = {
  ticket: string;
};

class PerformCheckIn extends UseCase<CheckInParams, void> {
  async onExecute({ticket}: CheckInParams): Promise<void> {
    const booking = await Booking.findOne({where: {uuid: ticket}, relations: ['user']});

    assert(booking, '예약 내역이 없습니다.');

    logger.info('체크인!');

    const now = new Date(/* '2021-08-23 08:31:00' */);

    await CheckIn.create({
      bookingId: booking.id,
      checkedInAt: now,
    }).save();

    await VisitRecord.create({
      bookingId: booking.id,
      studentId: booking.user.studentId,
      phoneNumber: booking.user.phoneNumber,
      cafeteriaId: booking.cafeteriaId,
      visitedAt: now,
    }).save();
  }
}

export default new PerformCheckIn();
