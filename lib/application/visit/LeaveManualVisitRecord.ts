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

import assert from 'assert';
import UseCase from '../../core/base/UseCase';
import {Cafeteria, logger, VisitRecord} from '@inu-cafeteria/backend-core';
import {CafeteriaNotExist, NotIdentifiable} from './errors';

export type LeaveManualVisitRecordParams = {
  studentId?: string;
  phoneNumber?: string;
  cafeteriaId: number;
};

class LeaveManualVisitRecord extends UseCase<LeaveManualVisitRecordParams, void> {
  async onExecute({
    studentId,
    phoneNumber,
    cafeteriaId,
  }: LeaveManualVisitRecordParams): Promise<void> {
    assert(studentId || phoneNumber, NotIdentifiable());

    const cafeteria = await Cafeteria.findOne({id: cafeteriaId});

    assert(cafeteria, CafeteriaNotExist());

    await VisitRecord.create({
      studentId,
      phoneNumber,
      cafeteria,
      visitedAt: new Date(),
    }).save();

    logger.info(`[${studentId ?? phoneNumber}] 방문 기록(식당 ${cafeteriaId})을 저장했습니다.`);
  }
}

export default new LeaveManualVisitRecord();
