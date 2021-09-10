import {Booking, CheckIn, logger, VisitRecord} from '@inu-cafeteria/backend-core';
import CheckInValidator from '../validation/CheckInValidator';
import {stringifyError} from '../../../common/utils/error';

export default class CheckInHandler {
  constructor(private readonly booking: Booking) {}

  async performCheckIn() {
    const {booking} = this;

    const validator = new CheckInValidator(booking);

    const {error} = await validator.validate();

    await this.leaveVisitRecord(booking);

    if (error) {
      throw error;
    }

    await this.checkIn(booking);
  }

  private async leaveVisitRecord(booking: Booking) {
    await VisitRecord.create({
      bookingId: booking.id,
      studentId: booking.user.studentId,
      phoneNumber: booking.user.phoneNumber,
      cafeteriaId: booking.cafeteriaId,
      visitedAt: new Date(),
    }).save();
  }

  private async checkIn(booking: Booking) {
    try {
      await CheckIn.create({
        bookingId: booking.id,
        checkedInAt: new Date(),
      }).save();
    } catch (e) {
      // 검증을 거치지 않고 이곳에 도달할 수 있습니다. 예를 들어 룰이 꺼져있을 수 있습니다.
      // 해당 경우는 성공이라고 보아야 하기에, 에러를 올려보내지 않고 조용히 처리합니다.
      logger.info(`체크인 저장이 실패하는 일이 발생했습니다: ${stringifyError(e)}`);
    }
  }
}
