import logRepository from '../../core/repositories/LogRepository';

export async function recentLogs() {
  return await logRepository.getAllLogsInPast24Hours();
}
