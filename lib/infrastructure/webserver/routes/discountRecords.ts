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

import {z} from 'zod';
import {logger} from '@inu-cafeteria/backend-core';
import {Response} from 'express';
import {Workbook} from 'exceljs';
import GetDiscountRecordsAsText from '../../../application/discountRecords/GetDiscountRecordsAsText';
import GetDiscountRecordsAsWorkbook from '../../../application/discountRecords/GetDiscountRecordsAsWorkbook';
import {
  defineRoute,
  defineSchema,
  stringAsInt,
  stringInYYYYMMDD,
} from '@inu-cafeteria/backend-core';

const schema = defineSchema({
  params: {
    dateString: stringInYYYYMMDD,
  },
  query: {
    cafeteriaId: stringAsInt,
    fileType: z.literal('txt').or(z.literal('xls')),
  },
});

export default defineRoute('get', '/records/discount/:dateString', schema, async (req, res) => {
  const {dateString} = req.params;
  const {cafeteriaId, fileType} = req.query;

  logger.info(
    `기록을 달라규!? 날짜는 ${dateString}, ${cafeteriaId}번 식당으루!? 결과는 ${fileType} 파일로 달라구?`
  );

  const params = {cafeteriaId, dateString};

  if (fileType === 'txt') {
    const text = await GetDiscountRecordsAsText.run(params);
    return sendText(res, text);
  } else {
    const workbook = await GetDiscountRecordsAsWorkbook.run(params);
    return sendExcelWorkbook(res, workbook, `${dateString}.xlsx`);
  }
});

function sendText(res: Response, text: string) {
  logger.info(`받아라 텍스트 응답!`);

  res.setHeader('Content-Type', 'text/plain');
  res.send(text);
}

function sendExcelWorkbook(res: Response, workbook: Workbook, filename: string) {
  logger.info(`받아라 엑셀 응답!`);

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

  workbook.xlsx.write(res).then(() => res.end());
}
