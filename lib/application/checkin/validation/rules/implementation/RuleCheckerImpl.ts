import {Booking} from '@inu-cafeteria/backend-core';
import RuleChecker from '../RuleChecker';

class RuleCheckerImpl implements RuleChecker {
  async checkInShouldNotExist(booking: Booking): Promise<boolean> {
    return booking.checkIn == null;
  }

  async checkInShouldBeInTime(booking: Booking): Promise<boolean> {
    return booking.isAvailableForCheckIn();
  }
}

export default new RuleCheckerImpl();
