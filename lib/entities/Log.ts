import logRepository from '../repositories/LogRepository';

export default class Log {
  message: string;
  timestamp: Date;

  static create(properties: Partial<Log>): Log {
    return Object.assign(new Log(), properties);
  }

  static type() {
    return `
    type Log { 
      message: String!
      timestamp: Date!
    }
    `;
  }

  static query() {
    return `recentLog: [Log]`;
  }

  static async recentLog() {
    return await logRepository.getAllLogsInPast24Hours();
  }
}
