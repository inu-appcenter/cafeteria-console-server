import JWT from 'jsonwebtoken';
import config from '../../../config';
import logger from './logger';

export function createJwt(payload: any) {
  return JWT.sign(payload, config.auth.key, {
    algorithm: 'HS256',
    expiresIn: config.auth.expiresIn,
  });
}

export function decodeJwt(jwt: string) {
  try {
    return JWT.verify(jwt, config.auth.key);
  } catch (e) {
    logger.error(e.message);
    return null;
  }
}
