import {stringifyError} from '../../../common/utils/error';
import CheckInValidator from '../validation/CheckInValidator';
import {Booking, CheckIn, logger, VisitRecord} from '@inu-cafeteria/backend-core';
import {subMinutes} from 'date-fns';
import {MoreThan} from 'typeorm';

export default class CheckInHandler {
  constructor(private readonly booking: Booking) {}

  /**
   * 체크인 요청을 처리합니다. 입장 시간을 무시하고 처리할 수 있습니다.
   *
   * @param gracefulInTime true이면 입장 시간을 무시하고 처리합니다.
   */
  async performCheckIn(gracefulInTime: boolean = false) {
    const {booking} = this;

    const validator = new CheckInValidator(booking);

    const {error} = gracefulInTime
      ? await validator.validateGracefully()
      : await validator.validateStrictly();

    await this.leaveVisitRecordIfNotDuplicated(booking);

    if (error) {
      throw error;
    }

    await this.checkIn(booking);
  }

  private async leaveVisitRecordIfNotDuplicated(booking: Booking) {
    const existingInLastMinute = await VisitRecord.findOne({
      bookingId: booking.id,
      visitedAt: MoreThan(subMinutes(new Date(), 1)),
    });

    if (existingInLastMinute == null) {
      logger.info(`입장 기록을 남깁니다.`);

      await VisitRecord.create({
        bookingId: booking.id,
        studentId: booking.user.studentId,
        phoneNumber: booking.user.phoneNumber,
        cafeteriaId: booking.cafeteriaId,
        visitedAt: new Date(),
      }).save();
    } else {
      logger.warn(
        `이 사용자는 1분 안에 해당 바코드로 체크인을 시도한 기록이 있습니다. 중복으로 기록을 남기지 않습니다.`
      );
    }
  }

  private async checkIn(booking: Booking) {
    try {
      await CheckIn.create({
        bookingId: booking.id,
        checkedInAt: new Date(),
      }).save();
    } catch (e) {
      // 검증을 거치지 않고 이곳에 도달할 수 있습니다. 예를 들어, 중복 방지 룰이 꺼져있을 수 있습니다.
      // 해당 경우는 성공이라고 보아야 하기에, 에러를 올려보내지 않고 조용히 처리합니다.
      logger.info(`체크인 저장에 실패하는 일이 발생했습니다: ${stringifyError(e)}`);
    }
  }
}
