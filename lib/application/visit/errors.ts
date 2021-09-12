import BadRequest from '../../common/errors/http/BadRequest';

export const NotIdentifiable = BadRequest.of(
  'not_identifiable',
  '학번과 전화번호 중 하나는 있어야 합니다.'
);

export const CafeteriaNotExist = BadRequest.of(
  'cafeteria_not_exist',
  '해당 식당은 존재하지 않습니다.'
);
