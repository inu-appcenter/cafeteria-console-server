import {Booking} from '@inu-cafeteria/backend-core';

export default interface RuleChecker {
  bookingShouldBeUsable(booking: Booking): Promise<boolean>;

  checkInShouldBeInTime(booking: Booking): Promise<boolean>;
}
