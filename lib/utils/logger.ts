import logSetupHelper from './logSetupHelper';
import getEnv from './env';
import winston from 'winston';
import {isProduction} from './nodeEnv';

const consoleTransport = logSetupHelper.getConsoleTransport();
const cloudwatchTransport = (prefix: string) => logSetupHelper.getCloudwatchTransport(prefix);
const combinedCloudwatchTransport = logSetupHelper.getCloudwatchTransport('combined');

function getLogger(prefix: string) {
  const transports: winston.transport[] = [consoleTransport];

  const productionTransports: winston.transport[] = [
    cloudwatchTransport(prefix),
    combinedCloudwatchTransport,
  ];

  if (isProduction()) {
    productionTransports.forEach((tp) => {
      transports.push(tp);
    });
  }

  const logger = logSetupHelper.createLogger(transports);

  logger.transports.forEach((transport) => {
    transport.silent = getEnv('NODE_ENV') === 'test';
  });

  return logger;
}

const loggers = {
  event: getLogger('event'),
  verbose: getLogger('verbose'),
  info: getLogger('info'),
  warn: getLogger('warn'),
  error: getLogger('error'),
};

export default {
  event(message: any) {
    loggers.event.info(logSetupHelper.formatLog(message, false));
  },

  verbose(message: any) {
    loggers.verbose.verbose(logSetupHelper.formatLog(message));
  },

  info(message: any) {
    loggers.info.info(logSetupHelper.formatLog(message));
  },

  warn(message: any) {
    loggers.warn.warn(logSetupHelper.formatLog(message));
  },

  error(message: any) {
    loggers.error.error(logSetupHelper.formatLog(message));
  },
};
