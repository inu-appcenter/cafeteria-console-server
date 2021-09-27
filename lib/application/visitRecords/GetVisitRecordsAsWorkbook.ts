import UseCase from '../../core/base/UseCase';
import {Workbook} from 'exceljs';
import {VisitRecord} from '@inu-cafeteria/backend-core';
import {localDateString, parseDateYYYYMMDD} from '../../common/utils/date';
import ExcelWorkbookBuilder from '../../core/excel/ExcelWorkbookBuilder';
import {startOfDay, endOfDay} from 'date-fns';

export type GetVisitRecordsAsWorkbookParams = {
  from: string;
  until: string;
};

class GetVisitRecordsAsWorkbook extends UseCase<GetVisitRecordsAsWorkbookParams, Workbook> {
  async onExecute({from, until}: GetVisitRecordsAsWorkbookParams): Promise<Workbook> {
    const visitRecords = await VisitRecord.findUserAgreedRecordsInRange(
      startOfDay(parseDateYYYYMMDD(from)),
      endOfDay(parseDateYYYYMMDD(until))
    );

    return new ExcelWorkbookBuilder({
      matrix: toMatrix(visitRecords),
      title: `방문 기록 (${from} ~ ${until})`,
    }).build();
  }
}

export default new GetVisitRecordsAsWorkbook();

function toMatrix(records: VisitRecord[]) {
  const columns = ['방문 일시', '방문 장소', '학번', '전화번호'];

  const rows = records.map((record) => [
    localDateString(record.visitedAt),
    record.cafeteria.displayName,
    record.studentId ?? '-',
    record.phoneNumber ?? '-',
  ]);

  return [columns, ...rows];
}
