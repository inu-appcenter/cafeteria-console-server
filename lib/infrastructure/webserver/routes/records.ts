import {Response} from 'express';
import {Workbook} from 'exceljs';
import {logger} from '@inu-cafeteria/backend-core';
import {defineSchema} from '../libs/schema';
import {stringAsInt, stringInYYYYMMDD} from '../../../common/utils/zodTypes';
import {defineRoute} from '../libs/route';
import {z} from 'zod';
import GetRecordsAsText from '../../../application/records/GetRecordsAsText';
import GetRecordsAsWorkbook from '../../../application/records/GetRecordsAsWorkbook';
import {authorizer} from '../libs/middlewares/authorizer';

const schema = defineSchema({
  params: {
    dateString: stringInYYYYMMDD,
  },
  query: {
    cafeteriaId: stringAsInt,
    fileType: z.literal('txt').or(z.literal('xls')),
  },
});

export default defineRoute('get', '/records/:dateString', schema, authorizer, async (req, res) => {
  const {dateString} = req.params;
  const {cafeteriaId, fileType} = req.query;

  logger.info(
    `기록을 달라규!? 날짜는 ${dateString}, ${cafeteriaId}번 식당으루!? 결과는 ${fileType} 파일로 달라구?`
  );

  const params = {cafeteriaId, dateString};

  if (fileType === 'txt') {
    const text = await GetRecordsAsText.run(params);
    return sendText(res, text);
  } else {
    const workbook = await GetRecordsAsWorkbook.run(params);
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

function sendWrongRequest(res: Response, message: string) {
  logger.info(`이보시오! 당신 요청 문제있소!`);

  res.status(400).send(`요청 형태가 올바르지 않습니다! ${message}`);
}
