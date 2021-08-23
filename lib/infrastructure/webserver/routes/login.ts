import config from '../../../../config';
import {isProduction} from '../../../common/utils/nodeEnv';
import {defineRoute} from '../libs/route';
import {defineSchema} from '../libs/schema';
import {z} from 'zod';
import Login from '../../../application/user/Login';

const schema = defineSchema({
  body: {
    username: z.string(),
    password: z.string(),
  },
});

export default defineRoute('post', '/login', schema, async (req, res) => {
  const {username, password} = req.body;

  const {jwt} = await Login.run({username, password});

  return res
    .status(201)
    .cookie(config.cookie.tokenName, jwt, {
      path: '/',
      secure: isProduction(),
      domain: config.cookie.domain,
      // sameSite: 'none', // 이 옵션을 안 주어야 크롬에서 로컬 개발 할 수 있음.
    })
    .send();
});
