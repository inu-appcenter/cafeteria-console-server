import BadRequest from '../../common/errors/http/BadRequest';

export const NoBookingParams = BadRequest.of(
  'no_booking_params',
  '해당 식당의 예약 옵션이 존재하지 않습니다.'
);

export const NoTimeSlot = BadRequest.of(
  'no_time_slot',
  '해당 식당 예약 옵션의 타임 슬롯이 존재하지 않습니다.'
);

export const NoBooking = BadRequest.of('no_booking', '예약 내역이 없습니다.');

export const CheckInAlreadyMade = BadRequest.of(
  'check_in_already_made',
  '이미 체크인이 완료되었습니다.'
);

export const CheckInNotInTime = BadRequest.of(
  'check_in_not_in_time',
  '체크인이 어려운 시각입니다.'
);
