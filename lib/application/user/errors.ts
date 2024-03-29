/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {Unauthorized} from '@inu-cafeteria/backend-core';

export const InvalidAuth = Unauthorized.of(
  'invalid_auth',
  '사용자 이름과 비밀번호를 확인해 주세요.'
);

export const NotLoggedIn = Unauthorized.of('not_logged_in', '로그인해주세요.');

export const InvalidJwt = Unauthorized.of('invalid_jwt', '유효하지 않은 토큰입니다.');
