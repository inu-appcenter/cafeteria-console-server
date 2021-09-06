import {Booking, CheckIn, VisitRecord} from '@inu-cafeteria/backend-core';
import CheckInValidator from '../validation/CheckInValidator';

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
    await CheckIn.create({
      bookingId: booking.id,
      checkedInAt: new Date(),
    }).save();
  }
}
