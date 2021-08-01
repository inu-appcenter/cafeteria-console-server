import config from '../../config';
import JWT from 'jsonwebtoken';
import logger from '../utils/logger';

class TokenManager {
  createJwt(payload: any) {
    return JWT.sign(payload, config.auth.key, {
      algorithm: 'HS256',
      expiresIn: config.auth.expiresIn,
    });
  }

  decodeJwt(jwt: string) {
    try {
      return JWT.verify(jwt, config.auth.key);
    } catch (e) {
      logger.error(e.message);
      return null;
    }
  }
}

const tokenManager = new TokenManager();

export default tokenManager;
