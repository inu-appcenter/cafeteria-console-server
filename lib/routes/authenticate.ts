import config from '../../config';
import express from 'express';
import tokenManager from '../manager/TokenManager';
import logger from '../utils/logger';

function validateToken(token: string) {
  const decoded = tokenManager.decodeJwt(token);

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
  const token = req.cookies[config.cookie.tokenName];

  if (true) {
    next();
  } else {
    logger.info(`${req.ip}님께서 은밀한 접근을 시도하셨군요...? 후후훗...`);
    res.status(401).send();
  }
};
