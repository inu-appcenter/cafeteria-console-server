/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import fetch from 'isomorphic-fetch';
import config from '../../../../config';
import {MoreThan} from 'typeorm';
import {subMinutes} from 'date-fns';
import {stringifyError} from '../../../common/utils/error';
import CheckInValidator from '../validation/CheckInValidator';
import {Booking, CheckIn, logger, VisitRecord} from '@inu-cafeteria/backend-core';

export default class CheckInHandler {
  constructor(private readonly booking: Booking, private readonly cafeteriaId: number) {}

  /**
   * 체크인 요청을 처리합니다. 입장 시간을 무시하고 처리할 수 있습니다.
   *
   * @param gracefulInTime true이면 입장 시간을 무시하고 처리합니다.
   */
  async performCheckIn(gracefulInTime: boolean = false) {
    const {booking, cafeteriaId} = this;

    const validator = new CheckInValidator(booking, cafeteriaId);

    const {error} = gracefulInTime
      ? await validator.validateGracefully()
      : await validator.validateStrictly();

    await this.leaveVisitRecordIfNotDuplicated(booking, cafeteriaId);

    if (error) {
      throw error;
    }

    await this.checkIn(booking);
  }

  /**
   * 입장 실패 또한 입장 기록으로 간주되므로,
   * 실패 직후(1분 미만) 재 요청으로 입장 성공시 중복 기록이 남을 수 있습니다.
   * 따라서 이를 막아주어야 합니다.
   *
   * @param booking
   * @param cafeteriaId 실제 요청이 들어온 식당의 식별자.
   * @private
   */
  private async leaveVisitRecordIfNotDuplicated(booking: Booking, cafeteriaId: number) {
    const existingInLastMinute = await VisitRecord.findOne({
      bookingId: booking.id,
      visitedAt: MoreThan(subMinutes(new Date(), 1)),
    });

    if (existingInLastMinute == null) {
      logger.info(`사용자(${booking.user.identifier()})의 입장 기록을 남깁니다.`);

      await VisitRecord.create({
        bookingId: booking.id,
        studentId: booking.user.studentId,
        phoneNumber: booking.user.phoneNumber,
        cafeteriaId: cafeteriaId,
        visitedAt: new Date(),
      }).save();
    } else {
      logger.warn(
        `이 사용자(${booking.user.identifier()})는 1분 안에 해당 바코드로 체크인을 시도한 기록이 있습니다. 중복으로 기록을 남기지 않습니다.`
      );
    }
  }

  private async checkIn(booking: Booking) {
    try {
      await CheckIn.create({
        bookingId: booking.id,
        checkedInAt: new Date(),
      }).save();

      // 이 라인은 최대한 빠르게 지나가야 합니다. 따라서 await으로 기다리지 않습니다.
      this.notifyToApiServer(booking.userId).then();
    } catch (e) {
      // 검증을 거치지 않고 이곳에 도달할 수 있습니다. 예를 들어, 중복 방지 룰이 꺼져있을 수 있습니다.
      // 해당 경우는 성공이라고 보아야 하기에, 에러를 올려보내지 않고 조용히 처리합니다.
      logger.info(`체크인 저장에 실패하는 일이 발생했습니다: ${stringifyError(e)}`);
    }
  }

  private async notifyToApiServer(userId: number) {
    // 모바일 클라이언트를 바라보는 API 서버에게 훅을 날려 예약 상태 변동(사용됨)을 알립니다.
    try {
      await fetch(config.microservices.endpoints.api.bookingsUpdated, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId}),
      });
    } catch (e) {
      logger.error(
        `API 서버에게 사용자 ${userId}의 예약 상태 변동을 알리는 데에 실패하였습니다: ${e}`
      );
    }
  }
}
