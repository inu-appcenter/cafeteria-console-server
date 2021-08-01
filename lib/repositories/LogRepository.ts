import {getCloudWatchLogs, setupAWS} from '../cloud/aws';
import config from '../../config';
import logger from '../utils/logger';
import {OutputLogEvent} from 'aws-sdk/clients/cloudwatchlogs';
import Log from '../entities/Log';

class LogRepository {
  constructor() {
    setupAWS();
  }

  private static rawEventToLog(event: OutputLogEvent) {
    if (!event.timestamp || !event.message) {
      return null;
    }

    const log = new Log();

    log.timestamp = event.timestamp;
    log.message = event.message;

    return log;
  }

  async getAllLogsInPast24Hours() {
    const past24h = new Date();
    past24h.setDate(past24h.getDate() - 1);

    const raw = await getCloudWatchLogs({
      logGroupName: config.aws.cloudwatch.serviceLogFetchParams.logGroupName,
      logStreamName: config.aws.cloudwatch.serviceLogFetchParams.logStreamName,
      startTime: past24h.getTime(),
    });

    if (!raw || !raw.events) {
      return [];
    }

    logger.info(`우효wwwwwwwww 서비스 로그 ${raw.events.length}개 겟☆또다제~~!~!~!`);

    return raw.events.map((event) => LogRepository.rawEventToLog(event)).filter((log) => !!log);
  }
}

const logRepository = new LogRepository();

export default logRepository;
