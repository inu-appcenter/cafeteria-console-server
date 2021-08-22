import config from '../../config';
import logger from '../utils/logger';
import {isProduction} from '../utils/nodeEnv';
import {createJwt} from '../utils/jwt';
import {defineRoute} from './libs/route';
import {defineSchema} from './libs/schema';
import {z} from 'zod';

const schema = defineSchema({
  body: {
    username: z.string(),
    password: z.string(),
  },
});

export default defineRoute('post', '/login', schema, async (req, res) => {
  const {username, password} = req.body;

  logger.verbose(`${username}님이 로그인을 하러 오셨군요...?`);

  if (authenticate(username, password)) {
    logger.verbose(`좋아, ${username}에게 로그인을 허가하여 주겠다....`);

    const jwt = createJwt({username: config.auth.adminUsername});

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
    logger.verbose(`어림도 없지!!! ${username}, 당신은 아웃이야!`);

    res.status(401).send();
  }
});

function authenticate(username: string, password: string) {
  return username === config.auth.adminUsername && password === config.auth.adminPassword;
}
