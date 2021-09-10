import {Booking} from '@inu-cafeteria/backend-core';

export default interface RuleChecker {
  /** RULE 1 */
  checkInShouldNotExist(booking: Booking): Promise<boolean>;

  /** RULE 2 */
  checkInShouldBeInTime(booking: Booking): Promise<boolean>;
}
