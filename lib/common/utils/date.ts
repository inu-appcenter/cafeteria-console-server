import moment from 'moment';
import assert from 'assert';

export function checkDateStringFormat(dateString: string) {
  return moment(dateString, 'YYYYMMDD', true).isValid();
}

export function parseDateYYYYMMDD(dateString: string) {
  const m = moment(dateString, 'YYYYMMDD', true);

  assert(m.isValid(), `올바르지 않은 날짜 포맷입니다. YYYYMMDD 형식을 지켜 주세요: ${dateString}`);

  return m.toDate();
}

export function localDateString(date: Date) {
  const format = {
    M: (date.getMonth() + 1).toString().padStart(2, '0'),
    d: date.getDate().toString().padStart(2, '0'),
    D: date.getDate().toString().padStart(2, '0'),
    h: date.getHours().toString().padStart(2, '0'),
    m: date.getMinutes().toString().padStart(2, '0'),
    s: date.getSeconds().toString().padStart(2, '0'),
    y: date.getFullYear().toString().padStart(4, '0'),
    Y: date.getFullYear().toString().padStart(4, '0'),
  };

  return `${format.Y}-${format.M}-${format.D} ${format.h}:${format.m}:${format.s}`;
}
