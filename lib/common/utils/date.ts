import moment from 'moment';

export function parseDateYYYYMMDD(dateString: string) {
  if (!/^(\d){8}$/.test(dateString)) {
    return undefined;
  }

  const y = parseInt(dateString.substr(0, 4));
  const m = parseInt(dateString.substr(4, 2)) - 1;
  const d = parseInt(dateString.substr(6, 2));

  return new Date(y, m, d);
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

export function formatDateYYYYMMDD(date: Date) {
  const format = {
    M: (date.getMonth() + 1).toString().padStart(2, '0'),
    D: date.getDate().toString().padStart(2, '0'),
    Y: date.getFullYear().toString().padStart(4, '0'),
  };

  return `${format.Y}${format.M}${format.D}`;
}

export function checkDateStringFormat(dateString: string) {
  return moment(dateString, 'YYYYMMDD', true).isValid();
}
