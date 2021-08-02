import express from 'express';
import {localDateString, parseDateYYYYMMDD} from '../utils/date';
import {createExcelWorkbookFromMatrix} from '../utils/fileExports';
import {Workbook} from 'exceljs';
import logger from '../utils/logger';
import {DiscountTransaction} from '@inu-cafeteria/backend-core';

export default async (req: express.Request, res: express.Response) => {
  const cafeteriaId = req.query.cafeteriaId as string;
  const dateString = req.params.date as string;
  const fileType = req.query.fileType as string;

  logger.info(
    `로그를 달라규!? 날짜는 ${dateString}, ${cafeteriaId}번 식당으루!? 결과는 ${fileType} 파일로 달라구?`
  );

  const discountRecords = await getRequestedRecords(dateString, cafeteriaId);

  switch (fileType) {
    case 'txt':
      const text = formatSimpleText(
        discountRecords,
        `결과 ${discountRecords.length}건.\n조회 시각: ${localDateString(
          new Date()
        )}\n조회 파라미터: {date: ${dateString}, fileType: ${fileType}, cafeteriaId: ${cafeteriaId}}\n`
      );
      return sendText(res, text);

    case 'xls':
      const workbook = await createExcelWorkbookFromMatrix(toMatrix(discountRecords), dateString);
      return sendExcelWorkbook(res, workbook, `${dateString}.xlsx`);

    default:
      const message = '이건 있을 수가 없는 일이오...!';
      return sendWrongRequest(res, message);
  }
};

async function getRequestedRecords(dateStringParam: string, cafeteriaIdQuery?: string) {
  return await DiscountTransaction.findTransactions(
    undefined,
    cafeteriaIdQuery ? parseInt(cafeteriaIdQuery) : undefined,
    parseDateYYYYMMDD(dateStringParam)
  );
}

/************************************************
 * 텍스트 형식의 파일을 만들어 보내는 함수들
 ***********************************************/

function formatSimpleText(records: DiscountTransaction[], title?: string) {
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

function sendText(res: express.Response, text?: string) {
  // 브라우저에서 바로 열람이 아닌 파일 다운로드를 원한다면 아래 코드를 쓰자!
  // res.setHeader("Content-Disposition", `attachment; filename=haha.txt`);

  logger.info(`받아라 텍스트 응답!`);

  res.setHeader('Content-Type', 'text/plain');
  res.send(text);
}

/************************************************
 * 엑셀 형식의 파일을 만들어 보내는 함수들
 ***********************************************/

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

function sendExcelWorkbook(res: express.Response, workbook: Workbook, filename: string) {
  logger.info(`받아라 엑셀 응답!`);

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

  workbook.xlsx.write(res).then(() => res.end());
}

/************************************************
 * 이상한 요청에 대응하는 함수
 ***********************************************/

function sendWrongRequest(res: express.Response, message: string) {
  logger.info(`이보시오! 당신 요청 문제있소!`);

  res.status(400).send(`요청 형태가 올바르지 않습니다! ${message}`);
}
