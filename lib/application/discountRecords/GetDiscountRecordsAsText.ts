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

import UseCase from '../../core/base/UseCase';
import {DiscountTransaction} from '@inu-cafeteria/backend-core';
import {localDateString, parseDateYYYYMMDD} from '../../common/utils/date';

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
