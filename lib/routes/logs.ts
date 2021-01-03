import logRepository from "../repositories/LogRepository";

export async function getLogs() {
    return await logRepository.getAllLogsInPast24Hours();
}
