import logRepository from '../../lib/core/repositories/LogRepository';

describe('# getAllLogsInPast24Hours', () => {
  it('should work', async () => {
    const logs = await logRepository.getAllLogsInPast24Hours();

    console.log(logs[logs.length - 1]);
  });
});
