import Checker from './rules/implementation/RuleCheckerImpl';
import {CheckInAlreadyMade, CheckInNotInTime} from '../errors';
import {Booking, CheckInRule, RuleValidator, Test, TestRunner} from '@inu-cafeteria/backend-core';

export default class CheckInValidator extends RuleValidator {
  constructor(private readonly booking: Booking) {
    super();
  }

  async validate() {
    return await this.runValidation(async () => {
      await this.testBasicRules();
    });
  }

  private async testBasicRules() {
    const tests: Test[] = [
      {
        ruleId: 1,
        validate: () => Checker.bookingShouldBeUsable(this.booking),
        failure: CheckInAlreadyMade(),
      },
      {
        ruleId: 2,
        validate: () => Checker.checkInShouldBeInTime(this.booking),
        failure: CheckInNotInTime(),
      },
    ];

    await new TestRunner(tests, {
      subject: this.booking.user.identifier()!,
      ruleClass: CheckInRule,
      excludedRuleIds: [],
    }).runTests();
  }
}
