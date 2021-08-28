import {getCloudWatchLogs, setupAWS} from '../../external/cloud/aws';
import config from '../../../config';
import logger from '../../common/utils/logger';
import {OutputLogEvent} from 'aws-sdk/clients/cloudwatchlogs';
import Log from './Log';

class LogRepository {
  constructor() {
    setupAWS();
  }

  async getAllLogsInPast24Hours(): Promise<Log[]> {
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

    return raw.events
      .map((event) => this.rawEventToLog(event))
      .filter((l): l is Log => l != null)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  private rawEventToLog({message, timestamp}: OutputLogEvent) {
    if (timestamp == null || message == null) {
      return undefined;
    }

    return Log.create({
      message,
      timestamp: new Date(timestamp),
    });
  }
}

const logRepository = new LogRepository();

export default logRepository;
