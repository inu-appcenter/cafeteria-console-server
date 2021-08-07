import config from '../../../config';
import express from 'express';
import logger from '../../utils/logger';
import {decodeJwt} from '../../utils/jwt';

function validateToken(token: string) {
  const decoded = decodeJwt(token);

  if (!decoded) {
    return false;
  }

  if (typeof decoded !== 'object') {
    return false;
  }

  const {userName} = decoded as Record<string, string>;

  if (userName == null) {
    return false;
  }

  return userName === config.auth.adminId;
}

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // TODO
  const token = req.cookies[config.cookie.tokenName];

  if (true) {
    next();
  } else {
    logger.info(`${req.ip}님께서 은밀한 접근을 시도하셨군요...? 후후훗...`);
    res.status(401).send();
  }
};
