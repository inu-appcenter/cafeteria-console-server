import RuleChecker from '../RuleChecker';
import {Booking, CafeteriaBookingParams} from '@inu-cafeteria/backend-core';
import {isWithinInterval, addMinutes} from 'date-fns';

class RuleCheckerImpl implements RuleChecker {
  async bookingShouldBeUsable(booking: Booking): Promise<boolean> {
    return booking.checkIn == null;
  }

  async checkInShouldBeInTime(booking: Booking): Promise<boolean> {
    const now = new Date();
    const reservedTime = booking.timeSlot;

    const bookingParams = await CafeteriaBookingParams.findOne({cafeteriaId: booking.cafeteriaId});
    const toleranceMinutes = bookingParams?.toleranceMinutes ?? 0;

    return isWithinInterval(now, {
      start: addMinutes(reservedTime, -toleranceMinutes),
      end: addMinutes(reservedTime, +toleranceMinutes),
    });
  }
}

export default new RuleCheckerImpl();
