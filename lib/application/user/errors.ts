import Unauthorized from '../../common/errors/http/Unauthorized';

export const InvalidAuth = Unauthorized.of(
  'invalid_auth',
  '사용자 이름과 비밀번호를 확인해 주세요.'
);

export const NotLoggedIn = Unauthorized.of('not_logged_in', '로그인해주세요.');

export const InvalidJwt = Unauthorized.of('invalid_jwt', '유효하지 않은 토큰입니다.');
