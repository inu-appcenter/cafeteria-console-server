import logRepository from '../repositories/LogRepository';

export async function recentLogs() {
  return await logRepository.getAllLogsInPast24Hours();
}
