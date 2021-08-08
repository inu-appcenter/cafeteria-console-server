import config from '../../config';
import logger from '../utils/logger';
import {isProduction} from '../utils/nodeEnv';
import {Request, Response} from 'express';
import {createJwt} from '../utils/jwt';

function authenticate(id: string, pw: string) {
  return id === config.auth.adminId && pw === config.auth.adminPassword;
}

export default function login(req: Request, res: Response) {
  const {id, password} = req.body;

  logger.verbose(`${id}님이 로그인을 하러 오셨군요...?`);

  if (authenticate(id, password)) {
    logger.verbose(`좋아, ${id}에게 로그인을 허가하여 주겠다....`);

    const jwt = createJwt({username: config.auth.adminId});

    res
      .status(201)
      .cookie(config.cookie.tokenName, jwt, {
        path: '/',
        secure: isProduction(),
        domain: config.cookie.domain,
        // sameSite: 'none',
      })
      .send();
  } else {
    logger.verbose(`어림도 없지!!! ${id}, 당신은 아웃이야!`);

    res.status(401).send();
  }
}
