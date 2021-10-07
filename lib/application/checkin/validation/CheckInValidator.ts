import Checker from './rules/implementation/RuleCheckerImpl';
import {differenceInMinutes} from 'date-fns';
import {CheckInAlreadyMade, CheckInNotInTime} from '../errors';
import {Booking, CheckInRule, RuleValidator, Test, TestRunner} from '@inu-cafeteria/backend-core';

export default class CheckInValidator extends RuleValidator {
  constructor(private readonly booking: Booking) {
    super();
  }

  /**
   * 보통의 요청에 대해 실행하는 검증입니다.
   */
  async validateStrictly() {
    return await this.runValidation(async () => {
      await this.testBasicRules();
      await this.testOptionalRules();
    });
  }

  /**
   * 시간을 제외하고 실행하는 검증입니다.
   */
  async validateGracefully() {
    return await this.runValidation(async () => {
      await this.testBasicRules();
    });
  }

  private async testBasicRules() {
    const tests: Test[] = [
      {
        ruleId: 1,
        validate: () => Checker.checkInShouldNotExist(this.booking),
        failure: CheckInAlreadyMade(),
      },
    ];

    await new TestRunner(tests, {
      subject: this.booking.user.identifier()!,
      ruleClass: CheckInRule,
      excludedRuleIds: [],
    }).runTests();
  }

  private async testOptionalRules() {
    const tests: Test[] = [
      {
        ruleId: 2,
        validate: () => Checker.checkInShouldBeInTime(this.booking),
        failure: CheckInNotInTime(generateTimeDiffString(this.booking)),
      },
    ];

    await new TestRunner(tests, {
      subject: this.booking.user.identifier()!,
      ruleClass: CheckInRule,
      excludedRuleIds: [],
    }).runTests();
  }
}

function generateTimeDiffString(booking: Booking): string {
  const now = new Date();

  if (booking.isEarlyToCheckIn()) {
    // 이른 경우
    return `${differenceInMinutes(booking.timeSlotStart, now)}분 이릅니다.`;
  } else if (booking.isLateToCheckIn()) {
    // 늦은 경우
    return `${differenceInMinutes(now, booking.timeSlotEnd)}분 늦었습니다.`;
  } else {
    // 제시간인 경우. 이 경우 이 메시지는 사용자에게 도달하지는 않을 것임.
    return '응? 체크인 가능 시간입니다.';
  }
}
