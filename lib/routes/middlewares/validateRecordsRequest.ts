import {Request, Response, NextFunction} from 'express';
import {formatDateYYYYMMDD, parseDateYYYYMMDD} from '../../utils/date';

/**
 * date와 fileType은 undefined 아니면 옳은 형식을 가지고 있음을 보장합니다.
 */
export default async function validateRecordsRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cafeteriaId = req.query.cafeteriaId as string;
  const dateString = req.params.date as string;
  const fileType = req.query.fileType as string;

  if (cafeteriaId == null) {
    // 놓아 둔다!
  } else if (isNaN(parseInt(cafeteriaId))) {
    return res.status(400).send(`cafeteriaId는 숫자입니다!`);
  }

  if (dateString == null) {
    req.params.date = formatDateYYYYMMDD(new Date());
  } else if (!parseDateYYYYMMDD(dateString)) {
    return res
      .status(400)
      .send(`날짜는 YYYYMMDD로 형식 맞추어 주세요! 안 써주셔도 됩니다. 기본값 오늘입니다.`);
  }

  const availableFileTypes = ['txt', 'xls'];

  if (fileType == null) {
    req.query.fileType = 'txt';
  } else if (!availableFileTypes.includes(fileType)) {
    return res
      .status(400)
      .send(
        `fileType은 ${availableFileTypes} 중 하나입니다. 안 써주셔도 됩니다. 기본값 txt입니다.`
      );
  }

  next();
}
