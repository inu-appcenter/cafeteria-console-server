import {getCloudWatchLogs, setupAWS} from "../cloud/aws";
import config from "../../config";

class LogRepository {

    constructor() {
        setupAWS();
    }

    async getAllLogsInPast24Hours() {
        const past24h = new Date();
        past24h.setDate(past24h.getDate() - 1);

        const raw = await getCloudWatchLogs({
            logGroupName: config.aws.cloudwatch.serviceLogFetchParams.logGroupName,
            logStreamName: config.aws.cloudwatch.serviceLogFetchParams.logGroupName,
            startTime: past24h.getTime()
        });

        return raw.events?.map((event) => event.message) || [];
    }
}

const logRepository = new LogRepository();

export default logRepository;
