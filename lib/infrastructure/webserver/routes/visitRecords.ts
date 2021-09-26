import {authorizer} from '../libs/middlewares/authorizer';
import {defineRoute} from '../libs/route';
import {defineSchema} from '../libs/schema';
import {stringInYYYYMMDD} from '../../../common/utils/zodTypes';
import {logger} from '@inu-cafeteria/backend-core';
import GetVisitRecordsAsWorkbook from '../../../application/visitRecords/GetVisitRecordsAsWorkbook';
import {Response} from 'express';
import {Workbook} from 'exceljs';

const schema = defineSchema({
  query: {
    from: stringInYYYYMMDD,
    until: stringInYYYYMMDD,
  },
});

export default defineRoute('get', '/records/visit', schema, authorizer, async (req, res) => {
  const {from, until} = req.query;

  logger.info(`출입대장을 달라규!?`);

  const workbook = await GetVisitRecordsAsWorkbook.run({from, until});

  sendExcelWorkbook(res, workbook, 'records.xlsx');
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
