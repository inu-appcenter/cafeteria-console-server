import UseCase from '../../core/base/UseCase';
import {localDateString, parseDateYYYYMMDD} from '../../common/utils/date';
import {DiscountTransaction} from '@inu-cafeteria/backend-core';

export type GetRecordsAsTextParams = {
  cafeteriaId: number;
  dateString: string;
};

class GetDiscountRecordsAsText extends UseCase<GetRecordsAsTextParams, string> {
  async onExecute({cafeteriaId, dateString}: GetRecordsAsTextParams): Promise<string> {
    const discountRecords = await DiscountTransaction.findTransactions(
      undefined,
      cafeteriaId,
      parseDateYYYYMMDD(dateString)
    );

    return formatSimpleText(
      discountRecords,
      `결과 ${discountRecords.length}건.\n조회 시각: ${localDateString(
        new Date()
      )}\n조회 파라미터: {date: ${dateString}, fileType: txt, cafeteriaId: ${cafeteriaId}}\n`
    );
  }
}

export default new GetDiscountRecordsAsText();

function formatSimpleText(records: DiscountTransaction[], title: string = '제목 없음') {
  const rows = records.map((record) => ({
    date: localDateString(record.timestamp),
    student_id: record.studentId,
  }));

  if (rows.length < 1) {
    return title;
  }

  const dateColumnWidth = Math.max(...rows.map((r) => r.date.length));
  const studentIdColumnWidth = Math.max(...rows.map((r) => r.student_id.length));

  const separator = `+${'-'.repeat(dateColumnWidth + 2)}+${'-'.repeat(studentIdColumnWidth + 2)}+`;
  const lines = [
    title,
    separator,
    `|${' 결제 확정 시각'.padEnd(dateColumnWidth, ' ')}|${' 학번'.padEnd(
      studentIdColumnWidth,
      ' '
    )}|`,
    separator,
    ...rows.map((r) => `| ${r.date} | ${r.student_id} |`),
    separator,
  ];

  return lines.join('\n');
}
