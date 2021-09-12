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
