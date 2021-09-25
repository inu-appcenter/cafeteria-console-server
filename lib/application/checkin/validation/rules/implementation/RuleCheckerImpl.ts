import {Booking} from '@inu-cafeteria/backend-core';
import RuleChecker from '../RuleChecker';
import {isWithinInterval} from 'date-fns';

class RuleCheckerImpl implements RuleChecker {
  async checkInShouldNotExist(booking: Booking): Promise<boolean> {
    return booking.checkIn == null;
  }

  async checkInShouldBeInTime(booking: Booking): Promise<boolean> {
    const now = new Date();

    return isWithinInterval(now, {
      start: booking.timeSlot,
      end: booking.nextTimeSlot,
    });
  }
}

export default new RuleCheckerImpl();
