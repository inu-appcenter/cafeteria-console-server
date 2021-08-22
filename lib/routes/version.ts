import logger from '../utils/logger';
import {defineRoute} from './libs/route';
import {defineSchema} from './libs/schema';

// 이 서버의 버전! 앱 버전 아님!

const schema = defineSchema({});

export default defineRoute('get', '/version', schema, async (req, res) => {
  const version = process.env.npm_package_version;

  logger.info(`버전을 묻는 것이냐...? 그래 알려주마.. ${version}이다...`);

  res.send(version);
});
