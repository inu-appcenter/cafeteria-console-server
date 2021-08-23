import config from '../../../../../config';
import express from 'express';
import logger from '../../../../common/utils/logger';
import {decodeJwt} from '../../../../common/utils/jwt';
import assert from 'assert';
import {InvalidJwt, NotLoggedIn} from '../../../../application/user/errors';

export const authorizer: express.RequestHandler<any, any, any, any> = (req, res, next) => {
  const token = req.cookies[config.cookie.tokenName];

  validateToken(token);

  next();
};

function validateToken(token?: string) {
  assert(token, NotLoggedIn());

  const decoded = decodeJwt(token);
  assert(decoded, InvalidJwt());
  assert(typeof decoded === 'object', InvalidJwt());

  const {username} = decoded as Record<string, string>;
  assert(username, InvalidJwt());
  assert(username === config.auth.adminUsername, InvalidJwt());
}
