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

import {logger} from '@inu-cafeteria/backend-core';
import {Response} from 'express';
import {Workbook} from 'exceljs';
import GetVisitRecordsAsWorkbook from '../../../application/visitRecords/GetVisitRecordsAsWorkbook';
import {defineRoute, defineSchema, stringInYYYYMMDD} from '@inu-cafeteria/backend-core';

const schema = defineSchema({
  query: {
    from: stringInYYYYMMDD,
    until: stringInYYYYMMDD,
  },
});

export default defineRoute('get', '/records/visit', schema, async (req, res) => {
  const {from, until} = req.query;

  logger.info(`출입대장을 달라규!?`);

  const workbook = await GetVisitRecordsAsWorkbook.run({from, until});

  sendExcelWorkbook(res, workbook, `visit_records_from_${from}_until_${until}.xlsx`);
});

function sendExcelWorkbook(res: Response, workbook: Workbook, filename: string) {
  logger.info(`받아라 엑셀 응답!`);

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

  workbook.xlsx.write(res).then(() => res.end());
}
