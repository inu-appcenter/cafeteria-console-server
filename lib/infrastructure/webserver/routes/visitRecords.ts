import {logger} from '@inu-cafeteria/backend-core';
import {Response} from 'express';
import {Workbook} from 'exceljs';
import {authorizer} from '../libs/middlewares/authorizer';
import {defineRoute} from '../libs/route';
import {defineSchema} from '../libs/schema';
import {stringInYYYYMMDD} from '../../../common/utils/zodTypes';
import GetVisitRecordsAsWorkbook from '../../../application/visitRecords/GetVisitRecordsAsWorkbook';

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