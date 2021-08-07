import {Request, Response} from 'express';
import logger from '../utils/logger';

// 이 서버의 버전! 앱 버전 아님!
export default function version(req: Request, res: Response) {
  const version = process.env.npm_package_version;

  logger.info(`버전을 묻는 것이냐...? 그래 알려주마.. ${version}이다...`);

  res.send(version);
}
