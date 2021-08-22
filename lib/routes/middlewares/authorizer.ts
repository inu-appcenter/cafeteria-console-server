import config from '../../../config';
import express from 'express';
import logger from '../../utils/logger';
import {decodeJwt} from '../../utils/jwt';

export const authorizer: express.RequestHandler<any, any, any, any> = (req, res, next) => {
  const token = req.cookies[config.cookie.tokenName];

  if (validateToken(token)) {
    next();
  } else {
    logger.info(`${req.ip}님께서 은밀한 접근을 시도하셨군요...? 후후훗...`);
    res.status(401).send();
  }
};

function validateToken(token: string) {
  const decoded = decodeJwt(token);

  if (!decoded) {
    return false;
  }

  if (typeof decoded !== 'object') {
    return false;
  }

  const {username} = decoded as Record<string, string>;

  if (username == null) {
    return false;
  }

  return username === config.auth.adminUsername;
}
