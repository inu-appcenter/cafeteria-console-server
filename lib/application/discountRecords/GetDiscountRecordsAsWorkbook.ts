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
import {Workbook} from 'exceljs';
import ExcelWorkbookBuilder from '../../core/excel/ExcelWorkbookBuilder';
import {DiscountTransaction} from '@inu-cafeteria/backend-core';
import {localDateString, parseDateYYYYMMDD} from '../../common/utils/date';

export type GetRecordsAsWorkbookParams = {
  cafeteriaId: number;
  dateString: string;
};

class GetDiscountRecordsAsWorkbook extends UseCase<GetRecordsAsWorkbookParams, Workbook> {
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

export default new GetDiscountRecordsAsWorkbook();

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
