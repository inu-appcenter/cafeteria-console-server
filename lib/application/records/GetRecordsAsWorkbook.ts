import UseCase from '../../core/base/UseCase';
import {Workbook} from 'exceljs';
import ExcelWorkbookBuilder from '../../core/excel/ExcelWorkbookBuilder';
import {DiscountTransaction} from '@inu-cafeteria/backend-core';
import {localDateString, parseDateYYYYMMDD} from '../../common/utils/date';

export type GetRecordsAsWorkbookParams = {
  cafeteriaId: number;
  dateString: string;
};

class GetRecordsAsWorkbook extends UseCase<GetRecordsAsWorkbookParams, Workbook> {
  async onExecute({cafeteriaId, dateString}: GetRecordsAsWorkbookParams): Promise<Workbook> {
    const discountRecords = await DiscountTransaction.findTransactions(
      undefined,
      cafeteriaId,
      parseDateYYYYMMDD(dateString)
    );

    return new ExcelWorkbookBuilder({
      matrix: toMatrix(discountRecords),
      title: dateString,
    }).build();
  }
}

export default new GetRecordsAsWorkbook();

function toMatrix(records: DiscountTransaction[]) {
  const columns = [
    '결제 확정 시각',
    '학번',
    '식당 번호(4: 학생식당)',
    '식사 시간대(4: 아침, 2: 점심, 1: 저녁)',
  ];

  const rows = records.map((record) => [
    localDateString(record.timestamp),
    record.studentId.toString(),
    record.cafeteriaId.toString(),
    record.mealType.toString(),
  ]);

  return [columns, ...rows];
}
