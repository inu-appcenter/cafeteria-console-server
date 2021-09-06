import UseCase from '../../core/base/UseCase';
import config from '../../../config';
import {createJwt} from '../../common/utils/jwt';
import assert from 'assert';
import {InvalidAuth} from './errors';
import {logger} from '@inu-cafeteria/backend-core';

export type LoginParams = {
  username: string;
  password: string;
};

export type LoginResult = {
  jwt: string;
};

class Login extends UseCase<LoginParams, LoginResult> {
  async onExecute({username, password}: LoginParams): Promise<LoginResult> {
    logger.verbose(`${username}님이 로그인을 하러 오셨군요...?`);

    const ok = username === config.auth.adminUsername && password === config.auth.adminPassword;

    assert(ok, InvalidAuth());

    logger.verbose(`좋아, ${username}에게 로그인을 허가하여 주겠다....`);

    const jwt = createJwt({username});

    return {jwt};
  }
}

export default new Login();
