import BadRequest from '../../common/errors/http/BadRequest';

export const NoBookingParams = BadRequest.of(
  'no_booking_params',
  '해당 식당의 예약 옵션이 존재하지 않습니다.'
);

export const NoTimeSlot = BadRequest.of(
  'no_time_slot',
  '해당 식당 예약 옵션의 타임 슬롯이 존재하지 않습니다.'
);
